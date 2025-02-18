import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getConfOf, getMD } from "./doc/fetchDOC";

import { Circular, Cover, DataVerifier } from "../../components/ui-components";
import ModalHT from "./components/ModalHT";

import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const confMainPage = {
  "_version": "0.1",
  "_descripcion": "Json para la configuracion del texto estatico de la pagina principal de HT",
  "title": "High Thoughput Collection",
  "description": "",
  "collection": [
      {
          "id": "DS-TFBS-001",
          "url": "TFBINDING",
          "title": "TF Binding Sites",
          "url_rawDescription" : "https://raw.githubusercontent.com/regulondbunam/RegulonDBHT-Web/master/docs/web_conf/mainPage/TFBS_description.md",
          "tooltip": "",
          "enable": true
      },
      {
          "id": "DS-RNA-006",
          "url": "RNAP_BINDING_SITES",
          "title": "RNAP Binding Sites",
          "url_rawDescription" : "a",
          "tooltip": "",
          "enable": true
      },
      {
          "id": "DS-TUS-002",
          "url": "TUS",
          "title": "Transcription Units",
          "url_rawDescription" : "https://raw.githubusercontent.com/regulondbunam/RegulonDBHT-Web/master/docs/web_conf/mainPage/TU_description.md",
          "tooltip": "",
          "enable": true
      },
      {
          "id": "DS-TTS-003",
          "url": "TTS",
          "title": "Transcription Termination Sites",
          "url_rawDescription" : "https://raw.githubusercontent.com/regulondbunam/RegulonDBHT-Web/master/docs/web_conf/mainPage/TTS_description.md",
          "tooltip": "",
          "enable": true
      },
      {
          "id": "DS-TSS-004",
          "url": "TSS",
          "title": "Transcription Start Sites",
          "url_rawDescription" : "https://raw.githubusercontent.com/regulondbunam/RegulonDBHT-Web/master/docs/web_conf/mainPage/TSS_description.md",
          "tooltip": "",
          "enable": true
      },
      {
          "id": "DS-GE-005",
          "url": "GENE_EXPRESSION",
          "title": "Gene Expression",
          "url_rawDescription" : "https://raw.githubusercontent.com/regulondbunam/RegulonDBHT-Web/master/docs/web_conf/mainPage/GE_description.md",
          "tooltip": "",
          "enable": true
      }
  ]
}

export default function Home() {
  const [conf, setConf] = useState(confMainPage);

  if (!conf) {
    return (
      <div id="loadView">
        <Circular />
      </div>
    );
  }

  //console.log(conf);

  return (
    <>
      <Cover>
        <Typography variant="h1">High Throughput Collection</Typography>
      </Cover>
      <Box sx={{ flexGrow: 1, p: "10px 6% 10px 6%" }}>
        {DataVerifier.isValidArray(conf.collection) && (
          <Grid container spacing={1}>
            {conf.collection.map((collection, index) => {
              return (
                <HtCard
                  key={"card_" + index + "_" + collection.id}
                  collection={collection}
                  index={index}
                />
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
}

function HtCard({ collection, index }) {
  const [mdData, setMdData] = useState();

  useEffect(() => {
    if (!mdData && document.getElementById("loadViewItem" + index)) {
      getMD(collection.url_rawDescription, (mdData) => {
        setMdData(mdData);
      });
    }
  }, [mdData, index, collection]);

  if (!mdData) {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <div id={"loadViewItem" + index} />
        <Skeleton variant="rectangular" width={275} height={235} />
      </Grid>
    );
  }
  let datasetType = collection.url;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ minWidth: 275, minHeight: 235, backgroundColor: "#DCE7ED" }} elevation={3}>
        <CardContent>
          {datasetType !== "RNAP_BINDING_SITES" && (
            <ModalHT title={collection.title} md_data={mdData} />
          )}
          
          <Link to={`${window.IN_URL.dataset}${datasetType}/`}>
            <Typography variant="h2" sx={{ fontSize: "2vw" }}>
              {collection.title}
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <div style={{}}>
            {datasetType === "RNAP_BINDING_SITES" && (
              <div>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-chip`}
                >
                  <Button sx={{textTransform: "inherit"}} >ChIP-chip</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-exo`}
                >
                  <Button sx={{textTransform: "inherit"}} >ChIP-exo</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-seq`}
                >
                  <Button sx={{textTransform: "inherit"}} >ChIP-seq</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=gSELEX`}
                >
                  <Button sx={{textTransform: "inherit"}} >gSELEX</Button>
                </Link>
              </div>
            )}
            {datasetType === "TFBINDING" && (
              <div>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-seq`}
                >
                  <Button sx={{textTransform: "inherit"}} >ChIP-seq</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-exo`}
                >
                  <Button sx={{textTransform: "inherit"}} >ChIP-exo</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=gSELEX-chip`}
                >
                  <Button sx={{textTransform: "inherit"}} >gSELEX-chip</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=DAPseq`}
                >
                  <Button sx={{textTransform: "inherit"}} >DAPseq</Button>
                </Link>
              </div>
            )}
            <div>
              <Link
                style={{ marginRight: "10px" }}
                to={`${window.IN_URL.finder}${datasetType}`}
              >
                <Button>Query Builder</Button>
              </Link>
            </div>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
