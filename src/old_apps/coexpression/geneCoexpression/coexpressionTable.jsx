import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import OTModal from "../ontologyTermsModal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useGetMainGenesBySearch } from "webServices/queries";
import { DataVerifier, FilterTable } from "../../../components/ui-components";

const COLUMNS = [
  {
    id: "coexpression_rank",
    filter: "fuzzyText",
    header: "Coexpression Rank",
    accessorKey: "_rank",
    cell: (info) => (
      <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
    ),
  },
  {
    id: "locusTag",
    filter: "fuzzyText",
    header: "Gene locusTag",
    accessorKey: "_locusTag",
    cell: (info) => (
      <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
    ),
  },
  {
    id: "gene_name",
    filter: "fuzzyText",
    header: "Gene name",
    accessorKey: "_geneName",
    cell: (info) => (
      <Link to={"/gene/" + info.row.original.geneId}>
        <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Link>
    ),
  },
  {
    id: "gene_products",
    filter: "fuzzyText",
    header: "Products",
    accessorKey: "_products",
    cell: (info) => (
      <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
    ),
  },
  {
    id: "gene_operon",
    filter: "fuzzyText",
    header: "Operon",
    accessorKey: "_operon",
    cell: (info) => (
      <Link to={"/operon/" + info.row.original.operonId}>
        {info.getValue()}
      </Link>
    ),
  },
  {
    id: "gene_regulators",
    filter: "fuzzyText",
    header: "Regulators",
    accessorKey: "_regulators",
    cell: (info) => {
      const regulators = info.row.original.regulators;
      return (
        <div>
          {regulators.map((regulator, index) => {
            return (
              <Link to={"/regulon/" + regulator._id}><span style={{marginRight: "10px"}} dangerouslySetInnerHTML={{__html: regulator.name}}/></Link>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "ontologyTerms",
    filter: "fuzzyText",
    header: "Ontology Terms",
    accessorKey: "_terms",
    cell: (info) => <OTModal products={info.row.original.products} />,
  },
];

function formatData(rankings, genesData) {
  let data = [];
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

      data.push({
        id: geneData.gene._id,
        geneId: geneData.gene._id,
        _rank: rank.rank.toFixed(2),
        _locusTag: rank.gene[0].locusTag,
        _geneName: geneData.gene.name,
        products: products,
        _products: _products,
        operonId: operon._id,
        _operon: operon?.name ? operon.name : "",
        regulators: regulators,
      });
    }
  });
  return data;
}

export default function CoexpressionTable({ rankings }) {
  const { genesData, loading,  /*error*/ } = useGetMainGenesBySearch(
    rankings.map((rank) => rank.gene[0]._id).join(" ")
  );
  return (
    <div>
        <h2>TOP 50 COEXPRESSION RANKING</h2>
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
    const data = formatData(rankings,genesData)
    return <FilterTable columns={COLUMNS} data={data} />
}
