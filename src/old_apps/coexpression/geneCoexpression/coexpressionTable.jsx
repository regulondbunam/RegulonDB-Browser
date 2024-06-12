import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import OTModal from "../ontologyTermsModal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useGetMainGenesBySearch } from "webServices/queries";
import { DataVerifier } from "../../../components/ui-components";
import FilterTable from "ui-components/Web/FilterTable";


function formatData(rankings, genesData) {
  let table = {
    columns: [
      {key:"rank",label:"RANK"},
      {key:"locus",label:"Locus Tag"},
      {key:"gene",label:"Gene"},
      {key:"product",label:"Products"},
      {key:"operon",label:"Operon"},
      {key:"regulators",label:"Regulators"},
      {key:"terms",label:"Ontology Terms"},

    ],
    data: []
  }
  rankings.forEach((rank) => {
    const geneData = genesData.find((gn) => gn._id === rank.gene[0]._id);
    if (geneData) {
      let _products = "";
      let products = [];
      if (DataVerifier.isValidArray(geneData?.products)) {
        products = geneData.products;
        _products = geneData.products.map((p) => p.name).join("; ");
      }

      let operon = {};
      let regulators = [];
      if (DataVerifier.isValidObject(geneData.regulation)) {
        if (DataVerifier.isValidObject(geneData.regulation.operon)) {
          operon = geneData.regulation.operon;
        }
        if (DataVerifier.isValidArray(geneData.regulation.regulators)) {
          regulators = geneData.regulation.regulators;
        }
      }
      const _operon = operon?.name ? operon.name : ""
      table.data.push({
        rank:rank.rank.toFixed(2),
        locus: rank.gene[0].locusTag,
        gene:<Link value={geneData.gene.name} to={"/gene/" + geneData.gene._id}>
        <span dangerouslySetInnerHTML={{ __html: geneData.gene.name }} />
      </Link>,
        products:_products,
        operon: <Link value={_operon} to={"/operon/" + operon._id}>
        {_operon}
      </Link>,
        regulators: <div value={regulators.map((r)=>r.name).join("; ")} >
        {regulators.map((regulator) => {
          return (
            <Link key={"regulator_lisTable_"+regulator._id} to={"/regulon/" + regulator._id}><span style={{marginRight: "10px"}} dangerouslySetInnerHTML={{__html: regulator.name}}/></Link>
          );
        })}
      </div>,
        terms: <OTModal value="" products={products} />,
      })
    }
  });
  return table;
}

export default function CoexpressionTable({ rankings }) {
  const { genesData, loading,  /*error*/ } = useGetMainGenesBySearch(
    rankings.map((rank) => rank.gene[0]._id).join(" ")
  );
  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {DataVerifier.isValidArray(genesData) && (
        Table(rankings,genesData)
      )}
    </div>
  );
}

function Table(rankings,genesData) {
    const table = formatData(rankings,genesData)
    return <FilterTable {...table} tableName="Top 50 Coexpression Ranking" titleVariant="h2" items={50}/>
}
