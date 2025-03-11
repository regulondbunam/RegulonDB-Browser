import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Tooltip
} from "@mui/material";
import { Remarkable } from "remarkable";
import { useLazyQuery, gql } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DATASET_TYPE_NAME, SOURCE_NAMES, DATASET_DESCRIPTIONS_PATHS} from "../static";
import { DataVerifier } from "../../../components/ui-components";
import './CardStyles.css';
import MarkdownLoader from '../components/MDLoader'


const query = gql`
  query GetDatasetsWithMetadata($datasetType: String!, $source: String!) {
    getDatasetsWithMetadata(datasetType: $datasetType, source: $source) {
      collectionName
      metadata {
        _id
        source
        datasetType
        metadataContent
        status
        releaseDate
        reference
      }
      datasets {
        _id
      }
    }
  }
`;

const md = new Remarkable();

function useGetMetadata(datasetType = "", sources = []) {
  const [sourcesCount, setSourcesCount] = useState(sources.length);
  const [metadata, setMetadata] = useState([]);
  const [getMetadata, { loading }] = useLazyQuery(query);
  const loadingMetadata = sourcesCount > 0;
  if (sourcesCount > 0 && !loading) {
    getMetadata({
      variables: {
        datasetType: datasetType,
        source: sources[sourcesCount - 1],
      },
      onCompleted: (data) => {
        if (
          DataVerifier.isValidArray(data?.getDatasetsWithMetadata?.datasets)
        ) {
          setMetadata([...metadata, data.getDatasetsWithMetadata]);
        }
        setSourcesCount(sourcesCount - 1);
      },
    });
  }
  return { metadata, loading: loadingMetadata };
}

function setDialogContent(source, content, datasetType ) {

  return (
      <DialogContent>
        {source === undefined ? (
            <MarkdownLoader url={DATASET_DESCRIPTIONS_PATHS(datasetType)} />
        ) : (
            <div
                dangerouslySetInnerHTML={{
                  __html: md.render(content),
                }}
            />
        )}
      </DialogContent>
  );
}

const CollectionCard = ({ datasetType, sources = [] }) => {
  const { metadata, loading } = useGetMetadata(datasetType, sources);
  const [open, setOpen] = useState(false);
  const [meta, setMeta] = useState();
  const navigate = useNavigate();

  const handleGoSource = (source) => {
    navigate(`./dataset/${datasetType}/source=${source}`);
  };

  const handleMoreInfoClick = (meta) => {
    setMeta(meta);
    setOpen(true);
  };

  const handleClose = () => {
    setMeta(undefined);
    setOpen(false);
  };

  return (
    <>
      <Card style={{ backgroundColor: "#e3f2fd" }} className="CollCard">
        <CardContent>
          <Grid container spacing={2} direction="column">
            {/*Card Top*/}
            <Grid container item spacing={1} xs={12}>
              {/* Collection Button*/}
              <Grid item xs={10}>
                <Button variant="contained" fullWidth
                  component={Link} to={"./dataset/" + datasetType}// + "/source="+sources}
                >
                  <Typography className={'CollectionButton'}>
                    {DATASET_TYPE_NAME(datasetType)}
                  </Typography>
                </Button>
              </Grid>

              {/* ReadMore IconButton*/}
              <Grid item xs={1} alignContent={"center"}>
                <Tooltip title="READ MORE" enterDelay={500}>
                  <IconButton color="primary" aria-label="icon"
                    onClick={()=>{
                      handleMoreInfoClick("data")
                    }}
                  >
                    <AutoStoriesIcon />
                  </IconButton>
                </Tooltip>
              </Grid>

              {/* QBuilder IconButton */}
              <Grid item xs={1} alignContent={"center"}>
                <Tooltip title="Query Builder" enterDelay={500}>
                  <IconButton color="primary" aria-label="icon" variant="text" component={Link}
                              to={`${window.IN_URL.finder}${datasetType}`} >
                    <DataObjectIcon/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>


          {/* Card Bottom */}
          {loading ? (
              <>Loading source information</>

          ) : (
              <Grid container item spacing={2} xs={12} alignContent={"center"}>
                {metadata.map((data, index) => (
                    <Grid container item xs={6} alignContent={"center"}>
                      <Grid item xs={10}>
                        <Button variant="outlined" fullWidth
                          // startIcon={<ListAltIcon />}
                          onClick={() => {
                            handleGoSource(data.metadata.source);
                          }}
                        >
                          {SOURCE_NAMES(data.metadata.source, datasetType)}
                        </Button>
                      </Grid>
                      <Grid item xs={2} alignContent={"center"}>
                        <Tooltip title="READ MORE" enterDelay={500}>
                          <IconButton
                              color="primary" aria-label="icon"
                              onClick={()=>{
                                handleMoreInfoClick(data)
                              }}
                              size={"small"}
                          >
                            <AutoStoriesIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                ))}
              </Grid>
          )}
        </CardContent>
      </Card>

      {/*READ MORE View*/}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <div>
            <h1>{DATASET_TYPE_NAME(datasetType)}</h1>
            <h2>{SOURCE_NAMES(meta?.metadata?.source, datasetType)}</h2>
          </div>
      </DialogTitle>
      <DialogContent>
        {setDialogContent(meta?.metadata?.source, meta?.metadata?.metadataContent, datasetType)}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CollectionCard;
