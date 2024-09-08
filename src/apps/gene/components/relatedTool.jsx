import React, { useEffect } from "react";
import { DataVerifier } from "../../../components/ui-components";
import { ExternalCrossReferences } from "../../../components/datamartSchema";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Navigation from "./navigation";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const query_getGu = gql`
  query getGu($advancedSearch: String) {
    getGUsBy(advancedSearch: $advancedSearch) {
      data {
        _id
      }
    }
  }
`;

const query_GetDatasetsID = gql`
  query GetDataset($advancedSearch: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      datasetType
      sourceSerie {
        strategy
      }
      sample {
        title
      }
    }
  }
`;

const query_getDataset = gql`
  query getDataset($advancedSearch: String, $gene: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      datasetType
      sourceSerie {
        strategy
      }
      sample {
        title
      }
    }
    getGeneExpressionFromSearch(advancedSearch: $gene, limit: 50) {
      datasetIds
      gene {
        name
      }
    }
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RelatedTool({ gene, products, regulation }) {
  let regulonName = "";
  let geneName = "";
  if (DataVerifier.isValidString(gene.name)) {
    geneName = gene.name;
    regulonName = gene.name.charAt(0).toUpperCase() + gene.name.slice(1);
  }
  const { data: gu } = useQuery(query_getGu, {
    variables: {
      advancedSearch: `${regulonName}[gensorUnit.name]`,
    },
  });
  //console.log(gu);
  const { data: ht } = useQuery(query_getDataset, {
    variables: {
      advancedSearch: `'${regulonName}'[objectsTested.name]`,
      gene: `${geneName}[gene.name]`,
    },
  });
  const [getGE,{data: htExpression}] = useLazyQuery(query_GetDatasetsID);

  useEffect(() => {
    if (
      DataVerifier.isValidArray(ht?.getGeneExpressionFromSearch) &&
      document.getElementById("relatedActive") && 
      !htExpression
    ) {
      let htIds = [];
      ht.getGeneExpressionFromSearch.forEach((ge) => {
        if (DataVerifier.isValidArray(ge.datasetIds)) {
          ge.datasetIds.forEach((id) => {
            const label = id.split("_")[2];
            htIds.push(label + "[_id]");
          });
        }
      });
      getGE({
        variables: {
          advancedSearch: htIds.join(" or "),
        },
      });
    }
  });

  //console.log("ht", ht);

  const [open, setOpen] = React.useState(false);
  let operonRelated = {};
  if (DataVerifier.isValidObject(regulation?.operon)) {
    operonRelated = {
      _id: regulation.operon._id,
      name: regulation.operon.name,
    };
  }
  let regulonRelated = [];
  let guIdRelated;
  let htDatasetsRelated = [];
  if (DataVerifier.isValidArray(products)) {
    products.forEach((product) => {
      regulonRelated.push({
        _id: product.regulonId,
        name: product.isRegulator ? product.name : "",
      });
    });
  }
  if(htExpression){
    if(DataVerifier.isValidArray(htExpression.getDatasetsFromSearch)){
      let hts =[]
      htExpression.getDatasetsFromSearch.forEach((dataset)=>{
        hts.push({
          ...dataset,
          _id: dataset._id.split("_")[2]
        })
      })
      htDatasetsRelated = [...htDatasetsRelated, ...hts]
    }
  }
  if (ht) {
    if (DataVerifier.isValidArray(ht.getDatasetsFromSearch)) {
      htDatasetsRelated = [...htDatasetsRelated, ...ht.getDatasetsFromSearch]
    }
  }
  if (gu) {
    if (DataVerifier.isValidArray(gu.getGUsBy.data)) {
      guIdRelated = gu.getGUsBy.data[0]._id;
    }
  }

  const navigate = useNavigate();

  return (
    <div id="relatedActive" className="noPrint">
      <Navigation
      regulonName={regulonName}
        operon={operonRelated}
        regulons={regulonRelated}
        guId={guIdRelated}
        htDatasets={htDatasetsRelated}
      />
      {DataVerifier.isValidObject(gene) && (
        <Tool title={"Related Tools"}>
          <List>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate(
                  `/dtt/leftEndPosition=${
                    gene.leftEndPosition - 1000
                  }&rightEndPosition=${gene.rightEndPosition + 1000}`
                );
              }}
            >
              <p>Drawing Traces Tool</p>
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate(`/coexpression/geneId=${gene._id}`);
              }}
            >
              <p>Gene Coexpression</p>
            </ListItemButton>
          </List>
        </Tool>
      )}
      <Tool title={"Download Options"}>
        <ListItemButton sx={{ pl: 4 }} onClick={pdfDownloader}>
          <ListItemIcon>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <p>PDF document</p>
        </ListItemButton>
      </Tool>
      {DataVerifier.isValidArray(gene.externalCrossReferences) && (
        <Tool title={"External Cross References"}>
          <ListItem sx={{ pl: 4 }}>
            <ExternalCrossReferences
              variant="list"
              externalCrossReferences={gene.externalCrossReferences}
            />
          </ListItem>
        </Tool>
      )}
      <Tool title={"FeedBack"}>
        <ListItemButton
          sx={{ pl: 4 }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p>User Feedback</p>
        </ListItemButton>
      </Tool>

      <Divider />
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className="accent"
            >
              Close
            </button>
          </div>
          <div class="asana-embed-container">
            <link
              rel="stylesheet"
              href="https://form.asana.com/static/asana-form-embed-style.css"
            />
            <iframe
              title="feedbackForm"
              className="asana-embed-iframe"
              src="https://form.asana.com/?k=uzd6ZoyuRLFIKgmaAw1uKQ&d=1108899165642340&embed=true"
            ></iframe>
            <div class="asana-embed-footer">
              <a
                rel="nofollow noopener  noreferrer"
                target="_blank"
                class="asana-embed-footer-link"
                href="https://asana.com/es?utm_source=embedded_form"
              >
                <span class="asana-embed-footer-text Typography Typography--s">
                  Formulario desarrollado por
                </span>
                <div
                  class="asana-embed-footer-logo"
                  role="img"
                  aria-label="Logo de Asana"
                ></div>
              </a>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function Tool({ title, children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <List dense>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </List>
  );
}

function pdfDownloader() {
  window.print();
}
