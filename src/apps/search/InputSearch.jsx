import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrlWithOrganism } from "../../components/ui-components/utils/navigation";

const styleSearch = {
  display: "flex",
  alignItems: "center",
};

export default function InputSearch({ hint }) {
  const [searchParams] = useSearchParams();
  const organismId = searchParams.get("organism");
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleSearch = () => {
    navigate(buildUrlWithOrganism("/search/" + keyword, organismId), { replace: true });
  }

  return (
    <div
      style={styleSearch}
      className="noPrint"
    >
      <TextField
        sx={{ backgroundColor: "white", borderRadius: "5px", width: "350px" }}
        id="outlined-keyword"
        variant="outlined"
        size="small"
        label="Search"
        value={keyword}
        onChange={handleChange}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearch()
          }
        }}
      />
      <Button
        sx={{ marginLeft: "10px", height: "48px" }}
        onClick={handleSearch}
        color="error"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
}
