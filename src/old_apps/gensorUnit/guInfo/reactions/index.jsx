import { useState, Suspense, lazy } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SingleReaction from "./singleReaction";
import Controls from "./controls";
import "./reaction.css";
import Data from "./data";
const MultiReactions = lazy(() => import("./multiReactions"));

export function MapReactions({ idSite, reactions, nodes, name }) {
  return (
    <Suspense fallback={<Loading idSite={idSite} />}>
      <MultiReactions reactions={reactions} idSite={idSite} nodes={nodes} name={name} />
    </Suspense>
  );
}

function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <CircularProgress />
      </div>
    </div>
  );
}

export default function Reactions({ reactions, nodes }) {
  const [indxReaction, serIndxReaction] = useState(0);
  const handleChange = (event, value) => {
    //console.log(value);
    serIndxReaction(value - 1);
  };
  return (
    <div>
      <div>
        <SingleReaction reaction={reactions[indxReaction]} nodes={nodes} />
      </div>
      <div>
        <Controls
          reactions={reactions}
          page={indxReaction + 1}
          onChange={handleChange}
        />
      </div>
      <div>
        <Data {...reactions[indxReaction]} />
      </div>
    </div>
  );
}

/*

const LAYERS = [
  "transcription",
  "translation",
  "state transition",
  "transport",
];

function SelectReactions(levelLayer, reactions) {
  let _reactions = [];
  console.log(reactions);
  reactions.forEach((reaction) => {
    [...Array(levelLayer)].forEach((n, i) => {
      if (reaction.type === LAYERS[i]) {
        _reactions.push(reaction);
      }
    });
  });
  return _reactions;
}*/
