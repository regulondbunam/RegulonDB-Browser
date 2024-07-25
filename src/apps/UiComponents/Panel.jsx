import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DrawerContext } from "apps/Drawers";

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

export default function PanelContent({ search = "", onSearch = () => {} }) {
  const { expand, isEmbed, setExpand } = useContext(DrawerContext);
  if (expand) {
    return <div>aqui falta el contenido de este ejeje</div>;
  } else {
    return (
      <IconExpand isEmbed={isEmbed} setExpand={setExpand} expand={expand} />
    );
  }
}
