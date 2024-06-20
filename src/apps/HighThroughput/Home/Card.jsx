import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Grid,
} from "@mui/material";
import ModalHT from "./ModalHT";
import { useNavigate } from "react-router-dom";

async function getMD(url, fun = () => {}) {
  if (url) {
    let mdData = await (await getRaw(url)).text();
    fun(mdData);
  } else {
    fun({ error: "urlError" });
  }
}

function getRaw(url) {
  return new Promise(function (resolve, reject) {
    fetch(url, { cache: "no-cache" })
      .then((response) => {
        if (response.ok) {
          response.blob().then(function (blob) {
            resolve(blob);
          });
        } else {
          console.error("Failed to fetch on get " + url);
          reject(undefined);
        }
      })
      .catch((error) => {
        reject(undefined);
        console.error("Failed to fetch", error);
      });
  });
}

export default function HTCard({ collection, index }) {
  const navigate = useNavigate();
  const [mdData, setMdData] = useState();

  const handleOnGo = (url) => {
    navigate(url)
  };

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
      <Card
        sx={{ minWidth: 275, minHeight: 235, backgroundColor: "#DCE7ED" }}
        elevation={3}
      >
        <CardContent>
          {datasetType !== "RNAP_BINDING_SITES" && (
            <ModalHT title={collection.title} md_data={mdData} />
          )}
          <Typography
            variant="h2"
            onClick={()=>{handleOnGo(`./dataset/${datasetType}/`)}}
            sx={{
              fontSize: "2vw",
              ":hover": { cursor: "pointer", backgroundColor: "#cadce7" },
            }}
          >
            {collection.title}
          </Typography>
        </CardContent>
        <CardActions>
          <div style={{}}>
            {datasetType === "RNAP_BINDING_SITES" && (
              <div>
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=ChIP-chip`)}} sx={{ textTransform: "inherit" }}>ChIP-chip</Button>
                {
                  //to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=ChIP-exo`)}} sx={{ textTransform: "inherit" }}>ChIP-exo</Button>

                {
                  // to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=ChIP-seq`)}} sx={{ textTransform: "inherit" }}>ChIP-seq</Button>

                {
                  // to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=gSELEX`)}} sx={{ textTransform: "inherit" }}>gSELEX</Button>
              </div>
            )}
            {datasetType === "TFBINDING" && (
              <div>
                {
                  // to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=ChIP-seq`)}} sx={{ textTransform: "inherit" }}>ChIP-seq</Button>

                {
                  // to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=ChIP-exo`)}} sx={{ textTransform: "inherit" }}>ChIP-exo</Button>

                {
                  // to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=gSELEX-chip`)}} sx={{ textTransform: "inherit" }}>gSELEX-chip</Button>

                {
                  // to={}
                }
                <Button onClick={()=>{handleOnGo(`./dataset/${datasetType}/experimentType=DAP`)}} sx={{ textTransform: "inherit" }}>DAP</Button>
              </div>
            )}
            <div>
              <Button onClick={()=>{handleOnGo(`./finder/${datasetType}`)}} >Query Builder</Button>
            </div>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
