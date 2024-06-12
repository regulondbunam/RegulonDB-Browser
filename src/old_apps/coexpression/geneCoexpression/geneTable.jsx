import { Link } from "react-router-dom";
import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../components/ui-components";
import OTModal from "../ontologyTermsModal";
import { Typography } from "@mui/material";

function formatData(gene) {
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

  return {
    _id: gene._id,
    _name: gene.gene.name,
    products: gene.products,
    _products: products,
    operonId: operon._id,
    _operon: operon?.name ? operon.name : "",
    regulators: regulators,
  };
}

export default function GeneTable({ gene }) {
  const data = useMemo(() => {
    return formatData(gene);
  }, [gene]);
  return (
    <div>
      <div>
        <Typography variant="h2" >
          {"Gene " + data._name}
        </Typography>
      </div>
      <div style={{ marginLeft: "20px" }} >
        <div>
          <Typography variant="relevantB" >
            Product{data.products.length > 1 ? "s" : ""}:{" "}
          </Typography>
          <Typography variant="relevant" >
            {data._products}
          </Typography>
        </div>
        <div>
          <Typography variant="relevantB" >
            Operon{": "}
          </Typography>
          <Link to={"/operon/" + data.operonId}>
            <Typography variant="relevant" >
              {data._operon}
            </Typography>
          </Link>
        </div>
        <div>
          <Typography variant="relevantB" >
            Regulators{": "}
          </Typography>
          {data.regulators.map((regulator) => {
            return (<Link key={"regulator_" + regulator._id} to={"/operon/" + data.operonId} style={{marginLeft: "10px"}} >
              <Typography variant="relevant" >
                {regulator.name}
              </Typography>
            </Link>)
          })}

        </div>
      </div>

    </div>
  );
}
