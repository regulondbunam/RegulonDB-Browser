import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DrawerContext } from "apps/Drawers";
import { Button } from "@mui/material";
import RelatedList, { OBJECT_TYPE } from "ui-components/Web/Related";
import Anchors from "./Anchors";

function IconExpand({ expand, setExpand = () => {}, isEmbed = false }) {
  const [isHover, setIsHover] = useState(false);
  if (isEmbed) {
    return (
      <Button
        variant="contained"
        color="secondary"
        endIcon={<SearchIcon />}
        onClick={setExpand}
      />
    );
  } else {
    return (
      <Button
        variant="contained"
        color="secondary"
        endIcon={<SearchIcon />}
        sx={{
          ":hover": {
            position: "absolute",
          },
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onClick={setExpand}
      >
        {isHover ? "Search" : ""}
      </Button>
    );
  }
}

export default function PanelLeft({ operon = {}, sections=[] }) {
  const { expand, isEmbed, setExpand } = useContext(DrawerContext);
  if (expand) {
    return (
      <div>
        <Anchors sections={sections} />
        <RelatedList
          regulonDB_id={operon._id}
          leftEndPosition={operon.operon.regulationPositions?.leftEndPosition}
          rightEndPosition={operon.operon.regulationPositions?.rightEndPosition}
          organism={"ecoli"}
          objectType={OBJECT_TYPE.OPERON}
        />
      </div>
    );
  } else {
    return (
      <IconExpand isEmbed={isEmbed} setExpand={setExpand} expand={expand} />
    );
  }
}
