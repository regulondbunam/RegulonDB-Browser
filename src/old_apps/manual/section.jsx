import { Remarkable } from "remarkable";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const downloadMD = async (setMarkdown, urlRaw) => {
  try {
    const response = await fetch(urlRaw);
    const markdown = await response.text();
    console.log(markdown);
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

export default function Section({ urlRaw }) {
  const [markdown, setMarkdown] = useState();

  if (!markdown) {
    downloadMD(setMarkdown,urlRaw);
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
    <div style={{ margin: "2%" }}>
      <p dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
    </div>
  );
}
