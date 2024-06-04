import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

/**
 * React component for displaying an alert message.
 *
 * @param {object} props - The props to pass to the underlying `MuiAlert` component.
 * @param {React.Ref} ref - A ref to attach to the `MuiAlert` component.
 * @returns {React.JSX} - The JSX element representing the alert.
 */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

/**
 * React component for handling download options for a sequence.
 *
 * @param {string} format - The selected format for the sequence.
 * @param {string} sequence - The sequence data to download or copy.
 * @param {string} title - The title associated with the sequence.
 * @param {string} idSequence - The ID of the sequence element in the DOM.
 * @returns {React.JSX} - The JSX element representing the download options.
 */
export default function DownloadOptions({ format, sequence, title, idSequence }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [snackOpen, setSnackOpen] = React.useState(false);
  
    /**
     * Boolean flag indicating whether the options menu is open.
     *
     * @type {boolean}
     */
    const openMenu = Boolean(anchorEl);
  
    /**
     * Event handler function for opening the snack bar to display a message.
     */
    const handleOpenSnack = () => {
      setSnackOpen(true);
    };
  
    /**
     * Event handler function for closing the snack bar.
     *
     * @param {object} event - The event object.
     * @param {string} reason - The reason for the snack bar closure.
     */
    const handleCloseSnack = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackOpen(false);
    };
  
    /**
     * Event handler function for opening the options menu.
     *
     * @param {object} event - The click event.
     */
    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    /**
     * Event handler function for closing the options menu.
     */
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    /**
     * Event handler function for initiating the download of the sequence as a file.
     *
     * @returns {void}
     */
    const download = () => {
      /**
       * DOM element representing the sequence with the specified ID.
       * @type {HTMLElement | null}
       */
      let e = document.getElementById(idSequence);
      if (e.innerText) {
        /**
         * Blob containing the sequence data.
         * @type {Blob}
         */
        const blob = new Blob([e.innerText]);
        /**
         * Dynamically created anchor element for downloading the sequence.
         * @type {HTMLAnchorElement}
         */
        const element = document.createElement("a");
        element.href = window.URL.createObjectURL(blob);
        element.download = `${title}.${format}`;
        document.body.appendChild(element);
        element.click();
        element.remove();
      }
    };
  
    return (
      <div style={{ marginRight: "5px" }}>
        <Button
          id="demo-customized-button"
          variant="outlined"
          disableElevation
          onClick={handleClickMenu}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ height: 30 }}
        >
          Download
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              navigator.clipboard.writeText(sequence);
              handleOpenSnack();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>copy sequence</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              download();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <ArticleOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{`sequence ${format} file`}</ListItemText>
          </MenuItem>
        </Menu>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={snackOpen}
            autoHideDuration={1000}
            onClose={handleCloseSnack}
          >
            <Alert
              onClose={handleCloseSnack}
              severity="success"
              sx={{ width: "100%" }}
            >
              Sequence copied to clipboard!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    );
  }