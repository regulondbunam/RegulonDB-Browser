import React, { useContext, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DrawerContext } from "apps/Drawers";
import { Button, TextField, Box } from "@mui/material";
import { ACTION } from "../static";
import { DataVerifier } from "ui-components/utils";
import ResentSearch from "./ResentSearch";
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

export default function LeftPanel({ state = {}, dispatch = (obj) => {} }) {
  const { expand, isEmbed, setExpand } = useContext(DrawerContext);

  if (expand) {
    return (
      <div>
        <InputSearch dispatch={dispatch} state={state} />
        <Anchors dispatch={dispatch} state={state} />
        <ResentSearch
          setSearch={(_search) => {
            dispatch({ type: ACTION.SEARCH, search: _search });
          }}
        />
      </div>
    );
  } else {
    return (
      <IconExpand isEmbed={isEmbed} setExpand={setExpand} expand={expand} />
    );
  }
}

function InputSearch({ dispatch = (obj) => {}, state = {} }) {
  const inputText = useRef();

  useEffect(() => {
    if (inputText.current) {
      const search = inputText.current.value;
      if (search !== state.search && state?.search) {
        inputText.current.value = state.search;
      }
    }
  }, [state.search]);

  const handleOnSearch = () => {
    if (inputText.current) {
      const search = inputText.current.value;
      if (DataVerifier.isValidString(search)) {
        dispatch({ type: ACTION.SEARCH, search: search });
      }
    }
  };

  return (
    <div>
      <TextField
        inputRef={inputText}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: <SearchIcon />,
          "aria-label": "search-keyword",
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleOnSearch();
          }
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" size="small" onClick={handleOnSearch}>
          search
        </Button>
      </Box>
    </div>
  );
}
