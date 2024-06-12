import { Remarkable } from "remarkable";
import CircularProgress from "@mui/material/CircularProgress";
import MarkdownNavbar from "markdown-navbar";
import { useState } from "react";
import "markdown-navbar/dist/navbar.css";

const gitUrl = (urlRaw, imgUrl) => {
  return (
    "https://github.com/regulondbunam/RegulonDBManual/raw/" +
    urlRaw.replace(
      /^https:\/\/raw\.githubusercontent\.com\/regulondbunam\/RegulonDBManual\/(.*\/)([^/]+)\.md$/,
      "$1"
    ) +
    imgUrl.replace(/^\.\//, "")
  );
};

function insertAbsoluteUrl(markdown = "", urlRaw) {
  const reg = /\.\/[^)|"|\s]+/gm;
  const matches = markdown.match(reg);
  if (matches) {
    matches.forEach((match) => {
      let url = gitUrl(urlRaw, match);
      markdown = markdown.replace(new RegExp(match, "g"), url);
    });
  }
  return markdown;
}

const downloadMD = async (setMarkdown, urlRaw) => {
  try {
    const response = await fetch(urlRaw);
    let markdown = await response.text();
    markdown = insertAbsoluteUrl(markdown, urlRaw);
    setMarkdown(markdown);
  } catch (error) {
    console.error("fetch error", error);
    setMarkdown({
      error: {
        type: "fetch",
        log: error,
      },
    });
  }
};

const md = new Remarkable();
md.set({
  html: true,
  breaks: true,
});

export default function Topic({ rawUrl, _url, title }) {
  const [markdown, setMarkdown] = useState();

  if (!markdown) {
    downloadMD(setMarkdown, rawUrl);
  }

  if (!markdown) {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CircularProgress />
      </div>
    );
  }

  if (markdown?.error) {
    return (
      <div>
        <h2>{markdown.error.type + " "}error</h2>
        <p>{markdown.error.log}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "15% 85%",
        marginTop: "20px",
      }}
    >
      <div>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "80vh",
            overflow: "auto",
          }}
        >
          <MarkdownNavbar source={markdown} />
        </div>
      </div>
      <div style={{padding: "2%"}} >
        <p dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
      </div>
    </div>
  );
}
