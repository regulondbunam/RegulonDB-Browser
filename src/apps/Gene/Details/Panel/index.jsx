import React, { useContext, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
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
        endIcon={<MenuIcon />}
        onClick={setExpand}
      />
    );
  } else {
    return (
      <Button
        variant="contained"
        color="secondary"
        endIcon={<MenuIcon />}
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
        {isHover ? "Menu" : ""}
      </Button>
    );
  }
}

export default function Panel({ gene = {}, sections=[] }) {
  const { expand, isEmbed, setExpand } = useContext(DrawerContext);
  if (expand) {
    return (
      <div>
        <Anchors sections={sections} />
        <RelatedList 
              regulonDB_id={gene._id}
              leftEndPosition={gene.gene?.leftEndPosition}
              rightEndPosition={gene.gene?.rightEndPosition}
              gene={gene.gene}
              organism={gene.organism}
            />
      </div>
    );
  } else {
    return (
      <IconExpand isEmbed={isEmbed} setExpand={setExpand} expand={expand} />
    );
  }
}



