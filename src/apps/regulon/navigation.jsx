import React, { useState } from "react";
import { DataVerifier } from "../../components/ui-components";
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
import { getSelectedOrganismId } from "../../utils/organismUtils";

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

export default function Navigation({
  regulonName,
  genes = [],
  operons = [],
  sigmulon = [],
  regulons = [],
  htIds = [],
  guIds = [],
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const organismId = getSelectedOrganismId(searchParams);

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
          {DataVerifier.isValidArray(genes) && (
            <>
              {genes.length > 1 ? (
                <Genes type="gene" elements={genes} organismId={organismId} />
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
          {DataVerifier.isValidArray(operons) && (
            <>
              {operons.length > 1 ? (
                <Genes type="operon" elements={operons} />
              ) : (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate(`/operon/${operons[0]._id}?organism=${encodeURIComponent(organismId)}`);
                  }}
                >
                  <p>operon</p>
                </ListItemButton>
              )}
            </>
          )}
          {DataVerifier.isValidArray(htIds) && (
            <HtDatasets htDatasets={htIds} regulonName={regulonName} />
          )}
          {DataVerifier.isValidArray(guIds) && (
            <>
              {guIds.map((guId) => {
                if (!guId) {
                  return null;
                }
                return (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate("/gu/" + guId);
                    }}
                  >
                    <p>GENSOR Unit</p>
                  </ListItemButton>
                );
              })}
            </>
          )}
        </List>
      </Collapse>
    </List>
  );
}

function Genes({ elements, type = "" , organismId = "" }) {
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

function HtDatasets({ htDatasets, regulonName }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  /*
  let tfBinding = []
  let geneExpression = []
  htDatasets.forEach((dataset)=>{
    switch (dataset.datasetType.toUpperCase()) {
      case "GENE_EXPRESSION":
        tfBinding.push()
        break;
      case "TFBINDING":
        
      break;
      default:
        break;
    }
  })*/
  return (
    <>
      <ListItemButton sx={{ pl: 4 }} onClick={handleOpen}>
        <p>HT-Datasets</p>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {htDatasets.find(
            (dt) => dt.datasetType.toUpperCase() === "TFBINDING"
          ) && (
            <Link to={"/ht/dataset/TFBINDING/tf=" + regulonName}>
              <ListItemButton>TF Binding</ListItemButton>
            </Link>
          )}
        </List>
        <List component="div" disablePadding>
          {htDatasets.find(
            (dt) => dt.datasetType.toUpperCase() === "GENE_EXPRESSION"
          ) && (
            <Link to={"/ht/dataset/GENE_EXPRESSION/"}>
              <ListItemButton>GENE_EXPRESSION</ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>
    </>
  );
}
