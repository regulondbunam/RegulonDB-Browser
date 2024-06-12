import React from "react";
import { useQuery, gql } from "@apollo/client";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GeneTable from "./geneTable";
import CoexpressionTable from "./coexpressionTable";
import { DataVerifier } from "../../../components/ui-components";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export const QUERY_getCoexpressionRank = gql`
  query getCoexpressionRank($name: String) {
    getTopCoexpressionRanking(gene: $name) {
      gene {
        _id
        locusTag
        name
      }
      rank
      rgbColor
    }
  }
`;

export default function GeneCoexpression({ genes }) {
  //console.log(genes);
  const [value, setValue] = React.useState(genes[0]._id);
  const gene = genes.find((gn) => gn._id === value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
      }}
    >
      <div style={{ margin: "10px 0 10px 5px", display: "flex" }}>
        <div style={{display: "flex", alignItems: "center"}} >
          <HelpOutlineIcon sx={{color: "blue"}} fontSize="large" />
        </div>
        <div>
          <p>This section allows the user to display the top 50 genes that are most highly coexpressed with each query gene. Each tab that is displayed represents one of the query genes. Within each tab or gene two sections are shown for this gene, the first section being "GENE INFORMATION" displaying information about the transcriptional regulation of that gene, and the second section being "THE TOP 50 COEXPRESSED GENES" showing the top 50 genes most highly coexpressed with that gene and their information on transcriptional regulation.
For more details of the coexpression method see the <a target="_blank" rel="noreferrer" href="https://testregulondb.ccg.unam.mx/search/coexpression/files/Coexpresion_User_Manual.pdf">user guide</a> </p> 
        </div>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {genes.map((gene, index) => {
          return (
            <Tab
              value={gene._id}
              key={"tab_" + index + "_" + gene._id}
              sx={{ textTransform: "none" }}
              label={
                <p>
                  <b dangerouslySetInnerHTML={{ __html: gene.gene.name }} />
                </p>
              }
            />
          );
        })}
      </Tabs>
      {gene && <Info gene={gene} />}
    </Box>
  );
}

function Info({ gene }) {
  //console.log(gene);
  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
    variables: { name: gene.gene.name },
  });
  return (
    <div>
      <h2>{`Gene ${gene.gene.name}`}</h2>
      <GeneTable gene={gene} />
      <div>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {DataVerifier.isValidArray(data?.getTopCoexpressionRanking) && <CoexpressionTable rankings={data.getTopCoexpressionRanking}  />}
      </div>
    </div>
  );
}
