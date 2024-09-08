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


export default function Navigation({
  regulonName,
  operon = {},
  regulons = [],
  guId = "",
  htDatasets = [],
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

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
          {DataVerifier.isValidObject(operon) && (
            <ListItemButton
              key={operon._id}
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/operon/" + operon._id);
              }}
            >
              <p>Operon </p>
            </ListItemButton>
          )}
          {DataVerifier.isValidArray(regulons) && (
            <>
              {regulons.map((regulon) => {
                if (!DataVerifier.isValidString(regulon._id)) {
                  return null;
                }
                return (
                  <ListItemButton
                    key={regulon._id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate("/regulon/" + regulon._id);
                    }}
                  >
                    <p>Regulon</p>
                  </ListItemButton>
                );
              })}
            </>
          )}
          {DataVerifier.isValidString(guId) && (
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/gu/" + guId);
              }}
            >
              <p>GENSOR Unit</p>
            </ListItemButton>
          )}
          {DataVerifier.isValidArray(htDatasets) && (
            <HtDatasets htDatasets={htDatasets} regulonName={regulonName} />
          )}
        </List>
      </Collapse>
    </List>
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
