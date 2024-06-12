import { Link } from "react-router-dom";
import { useMemo} from "react";
import { DataVerifier } from "../../../components/ui-components";
import FilterTable from "ui-components/Web/FilterTable";
import OTModal from "../ontologyTermsModal";


function formatData(geneData = []) {
  let table = {
    columns: [
      {key: "gene",label: "Gene"},
      {key: "product",label: "Product"},
      {key: "operon",label: "Operon"},
      {key: "regulators",label: "Regulators"},
      {key: "terms",label: "Ontology Terms"},
    ],
    data: []
  }
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
      table.data.push({
        gene: <Link value to={"/gene/" + gene.gene._id}>
        <span dangerouslySetInnerHTML={{ __html: gene.gene.name }} />
      </Link>,
        product: <span value={products} dangerouslySetInnerHTML={{ __html: products }} />,
        operon: <Link value={operon?.name} to={"/operon/" +  operon?._id}>
        {operon?.name}
      </Link>,
        regulators: <div value={regulators.map((r)=>r.name).join(", ")}>
        {regulators.map((regulator, index) => {
          return (
            <Link key={"regulator_"+index+"_"+regulator._id} to={"/regulon/" + regulator._id}><span style={{marginRight: "10px"}} dangerouslySetInnerHTML={{__html: regulator.name}}/></Link>
          );
        })}
      </div>,
        terms: <OTModal products={gene.products} />,
      })
    });
  }
  return table;
}

export default function Information({
  genes
}) {
  const table = useMemo(() => {
    return formatData(genes);
  }, [genes]);
  return (
    <div>
      <FilterTable {...table} tableName="Gene Information" titleVariant="h2" />
    </div>
  );
}

