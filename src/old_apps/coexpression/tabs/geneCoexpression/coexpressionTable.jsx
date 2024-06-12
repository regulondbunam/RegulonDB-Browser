import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { GetGeneInfo } from "../query/GetGeneInfo";
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import OTModal from '../query/ontologyTermsModal';


export const QUERY_getCoexpressionRank = gql`
query getCoexpressionRank($name:String){
    getTopCoexpressionRanking(gene:$name)
    {
        gene {
            _id
          locusTag
            name
        }
        rank
      rgbColor
    }
}
`

function CoexpressionTable({ geneName }) {
    const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, { variables: { "name": geneName } });

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <CircularProgress />
                </div>
            </div>
        );
    } if (error) {
        console.error(error)
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>check it out!</strong>
            </Alert>
        );
    } if (data) {
        return (
            <InnerTable getTopCoexpressionRanking={data.getTopCoexpressionRanking} />
        );
    }
    return null
}
export default CoexpressionTable;

function getRankedIds(getTopCoexpressionRanking = []) {

    const rankedIds = { ranks: [], geneIds: [] }
    getTopCoexpressionRanking.forEach((coexpressionRanked) => {
        rankedIds.ranks.push(coexpressionRanked.rank);
        rankedIds.geneIds.push(coexpressionRanked.gene.map(gene => gene._id).join(" "))
    })
    return rankedIds
}

function createData(name, products, operon, regulation, ontology) {
    return {
        name,
        products,
        operon,
        regulation,
        ontology,
    };
}

function getRow(dataGene) {

    let regulation = [];
    let operon = ""
    const name = dataGene.gene.name;
    const products = dataGene.products.map((product) => { return product.name }).join(", ");
    if (dataGene.regulation) {
        if (dataGene.regulation.operon) {
            operon = dataGene.regulation.operon.name;
        }
        let geneRegulators = dataGene.regulation.regulators
        geneRegulators.forEach((regulator, index) => {
            regulation.push(
                <div key={"regulationGene_" + dataGene.gene._id + "_" + regulator._id + "_" + index} >
                    <Link to={"/srna/" + regulator._id}>{regulator.name}</Link>
                </div>
            )
        })
    }

    const ontology = <OTModal products={dataGene.products} />;

    return createData(name, products, operon, regulation, ontology);

}

function InnerTable({ getTopCoexpressionRanking = [] }) {

    const { ranks, geneIds } = getRankedIds(getTopCoexpressionRanking)
    const [genesData, setGenesData] = React.useState();
    const [state, setState] = React.useState();

    return (
        <div>
            {!genesData && (
                <GetGeneInfo idsGenes={geneIds.join(" ")}
                    limit={geneIds.length}
                    getGeneResults={(geneSearchResults) => {
                        //setGeneResults(geneSearchResults)
                        setGenesData(geneSearchResults.getGenesBy.data)
                    }} setState={(state) => { setState(state) }}
                />
            )}
            {state === "loading" && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <CircularProgress />
                    </div>
                </div>
            )}
            {state === "error" && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        No se pudo — <strong>Error innerTable</strong>
                    </Alert>
                </div>
            )}
            {genesData && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Rank</TableCell>
                                <TableCell>Name (gene)</TableCell>
                                <TableCell align="right">Products</TableCell>
                                <TableCell align="right">Operon</TableCell>
                                <TableCell align="right">Gene Regulation</TableCell>
                                <TableCell align="right">Gene Ontology</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {geneIds.map((geneId, index) => {
                                const gene = genesData.find(element => element.gene._id === geneId);
                                const row = getRow(gene);
                                return (
                                    <TableRow
                                        key={geneId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{ranks[index].toFixed(2)}</TableCell>
                                        <TableCell component="th" scope="row">{gene.gene.name}</TableCell>
                                        <TableCell align="right">{gene.products.map}</TableCell>
                                        <TableCell align="right">{row.operon}</TableCell>
                                        <TableCell align="right">{row.regulation.map(regulator => regulator)}</TableCell>
                                        <TableCell align="right">{row.ontology}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    )
}

