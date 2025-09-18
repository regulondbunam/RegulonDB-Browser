import { Typography, TextField, Button, Link } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TitleSection from "./components/TitleSection";
import useLoadDataVM from "../viewModel/useLoadDataVM";
import demoData from "../model/demo";
import React from "react";

export default function LoadData({handleChangeTab=()=>{}}) {
  const {
    title,
    handleTitleChange,
    rawData,
    setRawData,
    handleRawDataChange,
    handleFileUpload,
  } = useLoadDataVM();
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      <TitleSection title="Dataset Title" help="help-text-dataset-title" />
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={title}
        onChange={handleTitleChange}
      />
      <TitleSection
        title="Dataset"
        help="help-text-datasetContent"
        subtitle={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2">
              Enter the data in tabular format or upload the file in tsv format.
              View a{" "}
              <Link
                onClick={() => {
                  setRawData(demoData);
                }}
              >
                Demo Data{" "}
              </Link>{" "}
              or check help document about <Link>Format</Link>
            </Typography>
          </div>
        }
      />
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        multiline
        rows={10}
        sx={{
          ".MuiOutlinedInput-input": { whiteSpace: "nowrap", overflow: "auto" },
        }}
        value={rawData}
        onChange={handleRawDataChange}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 0 0 0",
        }}
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            style={{ marginRight: "10px" }}
            size="small"
            endIcon={<FileUploadIcon />}
          >
            Upload Data
          </Button>
          <input
            type="file"
            accept=".txt"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button
            size="small"
            variant="contained"
            color="error"
            endIcon={<DeleteForeverIcon />}
            onClick={() => {
              setRawData("");
            }}
          >
            Clear Data
          </Button>
        </div>
        <div>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            sx={{ mr: 2 }}
            onClick={() => {handleChangeTab(null,3)}}
          >
            Draw whit default configuration
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => {handleChangeTab(null,2)}}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
