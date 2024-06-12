import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import OTModal from './ontologyTermsModal';

//construye objeto para pasar datos
function createData(name, products, operon, regulation, ontology) {
    return {
        name,
        products,
        operon,
        regulation,
        ontology,
    };
}

function getRows(dataGene = []) {
    let rows = [];

    dataGene.forEach(data => {

        let regulation = [];
        let operon = ""
        const name = data.gene.name;
        const products = data.products.map((product) => { return product.name }).join(", ");
        if (data.regulation) {
            if (data.regulation.operon) {
                operon = data.regulation.operon.name;
            }
            let geneRegulators = data.regulation.regulators
            geneRegulators.forEach((regulator, index) => {
                regulation.push(
                    <div key={"regulationGene_" + data.gene._id + "_" + regulator._id + "_" + index} >
                        <Link to={"/srna/" + regulator._id}>{regulator.name}</Link>
                    </div>
                )
            })
        }

        const ontology = <OTModal products={data.products} />;

        rows.push(createData(name, products, operon, regulation, ontology));
    });

    return rows;

}


export default function ResultsTable({ genesData }) {
    let rows = getRows(genesData);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name (gene)</TableCell>
                        <TableCell align="right">Products</TableCell>
                        <TableCell align="right">Operon</TableCell>
                        <TableCell align="right">Gene Regulation</TableCell>
                        <TableCell align="right">Gene Ontology</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.products}</TableCell>
                            <TableCell align="right">{row.operon}</TableCell>
                            <TableCell align="right">{row.regulation.map(regulator => regulator)}</TableCell>
                            <TableCell align="right">{row.ontology}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}