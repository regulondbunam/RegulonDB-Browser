import { Link } from "react-router-dom";
import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../components/ui-components";
import OTModal from "../ontologyTermsModal";

const COLUMNS = [
  {
    id: "gene_products",
    header: "products",
    accessorKey: "_products",
    cell: (info) => <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />,
  },
  {
    id: "operon",
    header: "Operon",
    accessorKey: "_operon",
    cell: (info) => (
      <Link to={"/operon/" + info.row.original.operonId}>
       <p> {info.getValue()}</p>
      </Link>
    ),
  },
  {
    id: "regulators",
    header: "Regulators",
    accessorKey: "_regulators",
    cell: (info) => {
      const regulators = info.row.original.regulators;
      return (
        <div>
          {regulators.map((regulator, index) => {
            return (
              <Link to={"/regulon/" + regulator._id}><p style={{marginRight: "10px"}} dangerouslySetInnerHTML={{__html: regulator.name}}/></Link>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "ontologyTerms",
    header: "Ontology Terms",
    accessorKey: "_terms",
    cell: (info) => (
        <OTModal products={info.row.original.products} />
      ),
  },
];

function formatData(gene) {
  let data = [];
  let products = "";
  if (DataVerifier.isValidArray(gene.products)) {
    products = gene.products.map((p) => p.name).join("; ");
  }
  let operon = {};
  let regulators = [];
  if (DataVerifier.isValidObject(gene.regulation)) {
    if (DataVerifier.isValidObject(gene.regulation.operon)) {
      operon = gene.regulation.operon;
    }
    if (DataVerifier.isValidArray(gene.regulation.regulators)) {
      regulators = gene.regulation.regulators;
    }
  }

  data.push({
    id: gene._id,
    _geneName: gene.gene.name,
    products: gene.products,
    _products: products,
    operonId: operon._id,
    _operon: operon?.name ? operon.name : "",
    regulators: regulators,
  });
  return data;
}

export default function GeneTable({ gene }) {
  const data = useMemo(() => {
    return formatData(gene);
  }, [gene]);
  return (
    <div>
      {DataVerifier.isValidArray(data) && (
        <FilterTable disableOptions columns={COLUMNS} data={data} />
      )}
    </div>
  );
}
