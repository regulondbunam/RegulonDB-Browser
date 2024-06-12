import { useEffect, useState } from "react";
import { Cover as CoverUI } from "ui-components/Web/Cover";
import { Typography } from "@mui/material";

const IDTitle = "title_cover_coexpressionTool";
const eventName = "cover_coexpressionTool_event";

export function UpdateTitle({ state, message }) {
  let detail = {};
  if (state) {
    detail.state = state;
  }
  if (message) {
    detail.message = message;
  }
  const COVER = document.getElementById(IDTitle);
  if (COVER) {
    //console.log(COVER);
    const COVER_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    COVER.dispatchEvent(COVER_REACTION);
  }
}

export default function Cover(params) {
  const [state, setState] = useState("done");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cover = document.getElementById(IDTitle);
    if (cover) {
      cover.addEventListener(
        eventName,
        function (e) {
          //console.log(`state`, e.detail)
          if (e.detail.state) {
            setState(e.detail.state);
          }
          if (e.detail.message) {
            setMessage(e.detail.message);
          }
        },
        false
      );
    }
  });
  return (
    <CoverUI state={state} message={message}>
        <Typography variant="h1">Gene coexpression</Typography>
      </CoverUI>
  );
}
