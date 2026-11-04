import { Link } from "react-router-dom";
import { useMemo} from "react";
import { DataVerifier, FilterTable } from "../../../components/ui-components";
import OTModal from "../ontologyTermsModal";


const COLUMNS = (organismId) => [
  {
    id: "gene_name",
    header: "Gene Name",
    accessorKey: "_geneName",
    cell: (info) => (
      <Link to={"/gene/" + info.row.original.id + "?organism=" + encodeURIComponent(organismId)}>
        <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Link>
    ),
  },
  {
    id: "gene_products",
    header: "Gene Products",
    accessorKey: "_products",
    cell: (info) => (<p dangerouslySetInnerHTML={{ __html: info.getValue() }} />),
  },
  {
    id: "operon",
    header: "Operon",
    accessorKey: "_operon",
    cell: (info) => (
      <Link to={"/operon/" + info.row.original.operonId + "?organism=" + encodeURIComponent(organismId)}>
        {info.getValue()}
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
              <Link to={"/regulon/" + regulator._id + "?organism=" + encodeURIComponent(organismId)}><span style={{marginRight: "10px"}} dangerouslySetInnerHTML={{__html: regulator.name}}/></Link>
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

function formatData(geneData = []) {
  let data = [];
  if (DataVerifier.isValidArray(geneData)) {
    geneData.forEach((gene) => {
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
        id: gene.gene._id,
        _geneName: gene.gene.name,
        _products: products,
        products: gene.products,
        operonId: operon._id,
        _operon: operon?.name ? operon.name : "",
        regulators: regulators,
      });
    });
  }
  return data;
}

export default function Information({
  genes,
  organismId
}) {
  const data = useMemo(() => {
    return formatData(genes);
  }, [genes]);
  const columns = COLUMNS(organismId);
  return (
    <div>
      {DataVerifier.isValidArray(data) && <FilterTable columns={columns} data={data} />}
    </div>
  );
}

