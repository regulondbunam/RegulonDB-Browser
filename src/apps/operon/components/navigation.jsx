import React, { useState } from "react";
import { DataVerifier } from "../../../components/ui-components";
//import { ExternalCrossReferences } from "../../../components/datamartSchema"
import { useNavigate, Link } from "react-router-dom";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSearchParams } from "react-router-dom";
import { getSelectedOrganismId } from "../../../utils/organismUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Navigation({ idValue }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const organismId = getSelectedOrganismId(searchParams);
  let regulons = [];
  let genes = [];
  Object.keys(idValue).forEach((id) => {
    const value = idValue[id];
    if (!DataVerifier.isValidArray(value)) {
      return null;
    }
    switch (value[1]) {
      case "regulon":
        regulons.push({ _id: id, name: value[0] });
        break;
      case "gene":
        genes.push({ _id: id, name: value[0] });
        break;
      default:
        break;
    }
  });
  return (
    <List dense>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={"Navigation"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {genes.length > 0 && (
            <>
              {genes.length > 1 ? (
                <OpenModal type="gene" elements={genes} organismId={organismId} />
              ) : (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate(`/gene/${genes[0]._id}?organism=${encodeURIComponent(organismId)}`);
                  }}
                >
                  <p>gene</p>
                </ListItemButton>
              )}
            </>
          )}
          {regulons.length > 0 && (
            <>
              {regulons.length > 1 ? (
                <OpenModal type="regulon" elements={regulons} organismId={organismId} />
              ) : (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate(`/regulon/${regulons[0]._id}?organism=${encodeURIComponent(organismId)}`);
                  }}
                >
                  <p>regulon</p>
                </ListItemButton>
              )}
            </>
          )}
        </List>
      </Collapse>
    </List>
  );
}

function OpenModal({ elements, type = "", organismId = "" }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemButton sx={{ pl: 4 }} onClick={handleOpen}>
        <p>{elements.length > 1 ? type + "s" : "" + type}</p>
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Button color="error" variant="contained" onClick={handleClose}>
              Exit
            </Button>
            <p>
              <b>{type + " "}Related</b>
            </p>
          </div>
          <div style={{ height: "30vh", overflow: "auto" }}>
            {elements.map((element) => {
              return (
                <div key={element._id} style={{ margin: "5px" }}>
                  <Link to={"/" + type + "/" + element._id + "?organism=" + encodeURIComponent(organismId)}>
                    <p dangerouslySetInnerHTML={{ __html: element.name }} />
                  </Link>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </>
  );
}

function HtDatasets({ htDatasets }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(htDatasets);
  return (
    <>
      <ListItemButton sx={{ pl: 4 }} onClick={handleOpen}>
        <p>HT-Datasets</p>
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Button color="error" variant="contained" onClick={handleClose}>
              Exit
            </Button>
            <p>
              <b>High Throughput Collection Datasets Found</b>
            </p>
          </div>
          <div style={{ height: "40vh", overflow: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>title</th>
                  <th>datasetType</th>
                  <th>strategy</th>
                </tr>
              </thead>
              <tbody>
                {htDatasets.map((dataset) => {
                  return (
                    <tr key={dataset.id}>
                      <td>
                        <Link
                          to={
                            "/ht/dataset/" +
                            dataset.datasetType.toUpperCase() +
                            "/datasetId=" +
                            dataset._id
                          }
                        >
                          {dataset.sample.title}
                        </Link>
                      </td>
                      <td>{dataset.datasetType}</td>
                      <td>{dataset.sourceSerie.strategy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </>
  );
}
