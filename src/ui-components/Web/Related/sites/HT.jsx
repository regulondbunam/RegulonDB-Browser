import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { DataVerifier } from 'ui-components/utils';
import { List, ListItem, ListItemText, ListItemButton, Typography, Collapse, Skeleton, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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

export default function HTsite({ regulonName = "", geneName = "" }) {
    const [openSites, setOpenSites] = React.useState(false);

    const { data: ht, loading, error } = useQuery(query_getDataset, {
        variables: {
            advancedSearch: `'${regulonName}'[objectsTested.name]`,
            gene: `${geneName}[gene.name]`,
        },
    });
    const handleClickSites = () => {
        setOpenSites(!openSites);
    };

    if (loading) {
        return (
            <ListItem dense >
                <ListItemText dense primary="loading related element.." />
                <Box sx={{ position: 'absolute', width: "100%" }} >
                    <Skeleton animation="pulse" variant="rectangular" height={30} />
                </Box>
            </ListItem>
        )
    }
    if (ht && !error) {
        const isGeneExpression = DataVerifier.isValidArray(ht?.getGeneExpressionFromSearch)
        const isTF = DataVerifier.isValidArray(ht?.getDatasetsFromSearch)
        if(!isGeneExpression && !isTF){
            return null
        }
        return (
            <>
                <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 2 }} dense onClick={handleClickSites}>
                        <ListItemText primary={<Typography variant='irrelevantB' >High Throughput Datasets</Typography>} />
                        {openSites ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openSites} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {isGeneExpression && (<DatasetsInGeneExpression geneName={geneName} />)}
                        {isTF && (<DatasetsInTF regulonName={regulonName} />)}
                    </List>
                </Collapse>
            </>
        )
    }
    return (
        null
    )
}

function DatasetsInGeneExpression({ geneName }) {
    const nav = useNavigate()
    return (
        <ListItemButton sx={{ pl: 4 }} dense  onClick={() => { nav(`/ht/dataset/TFBINDING/geneName=${geneName}`) }} >
            <ListItemText primary={<Typography variant='irrelevantB' >Gene Expression</Typography>} />
        </ListItemButton>
    )
}

function DatasetsInTF({ regulonName }) {
    const nav = useNavigate()
    return (
        <ListItemButton sx={{ pl: 4 }} dense  onClick={() => { nav(`/ht/dataset/GENE_EXPRESSION/tf=${regulonName}`) }} >
        <ListItemText primary={<Typography variant='irrelevantB' >TF Binding Sites</Typography>} />
    </ListItemButton>
    )
}