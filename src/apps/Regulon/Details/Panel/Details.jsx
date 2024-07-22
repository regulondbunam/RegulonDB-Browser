import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Anchors, DrawerContext } from "apps/Drawers";
import RelatedList from "ui-components/Web/Related";

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
        {isHover ? "Search" : ""}
      </Button>
    );
  }
}

export default function PanelDetails({ sections = [], RegulatorId }) {
  const { expand, isEmbed, setExpand } = useContext(DrawerContext);
  if (expand) {
    return <div>
        <Anchors sections={sections} />
        <RelatedList
                        collapse={false}
                        regulonDB_id={RegulatorId}
                    />
    </div>;
  } else {
    return (
      <IconExpand isEmbed={isEmbed} setExpand={setExpand} expand={expand} />
    );
  }
}
