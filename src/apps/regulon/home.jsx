import React, { useMemo } from "react";
import { Cover, DataVerifier } from "../../components/ui-components";
import { gql, useQuery } from "@apollo/client";
import { FilterTable } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
//import Data from "./exampleData.json";
import { Link, useSearchParams } from "react-router-dom";
const query_GET_ALL_REGULON = gql`
  query getAllRegulon($organismId: String) {
    getAllRegulon(organismId: $organismId) {
      data {
        _id
        regulator {
          name
          abbreviatedName
        }
        summary {
          bindingSites {
            total
          }
          genes {
            total
          }
          operons {
            total
          }
          regulatoryInteractions {
            total
          }
          sigmaFactors {
            total
          }
          transcriptionFactors {
            total
          }
          transcriptionUnits {
            total
          }
        }
      }
    }
  }
`;

const COLUMNS = [
  {
    header: "Regulon",
    columns: [
      {
        id: "Regulon_Name",
        header: "Name",
        accessorKey: "_name",
        filter: "fuzzyText",
        cell: (info) => (
          <Link to={"/regulon/" + info.row.original.id}>{info.getValue()}</Link>
        ),
      },
    ],
  },
  {
    header: "Regulated",
    columns: [
      {
        id: "regulated_genes",
        header: "Genes",
        accessorKey: "_genes",
        filter: "fuzzyText",
      },
      {
        id: "regulated_operon",
        header: "Operons",
        accessorKey: "_operon",
        filter: "fuzzyText",
      },
      {
        id: "regulated_tu",
        header: "Transcription Unit",
        accessorKey: "_tu",
        filter: "fuzzyText",
      },
    ],
  },
  {
    header: "Total of",
    columns: [
      {
        id: "total_of_regulatory_interaction",
        header: "Regulatory Interaction",
        accessorKey: "_ri",
        filter: "fuzzyText",
      },
      {
        id: "total_of_binding_sites",
        header: "Binding Sites",
        accessorKey: "_bs",
        filter: "fuzzyText",
      },
    ],
  },
];
function formatData(regulons = []) {
  let data = [];
  if (DataVerifier.isValidArray(regulons)) {
    regulons.forEach((regulon, index) => {
      const { summary, regulator, _id } = regulon;
      data.push({
        //id: regulator.name+"_"+index,
        //_name: <Link value={regulator.name} to={"/regulon/" + _id} >{regulator.name}</Link>,
        id: _id,
        _name: regulator.abbreviatedName,
        _genes: summary.genes.total,
        _operon: summary.operons.total,
        _tu: summary.transcriptionUnits.total,
        _ri: summary.regulatoryInteractions.total,
        _bs: summary.bindingSites.total,
      });
    });
  }
  return data;
}
export default function Home() {
  const [searchParams] = useSearchParams();
  const organismId = searchParams.get("organism");
  const { data, loading, error } = useQuery(query_GET_ALL_REGULON, {
    variables: {
      organismId: organismId
    }
  });
  //console.log(Data)
  //let data = Data.data
  let state = "done";
  let title = "Regulons";

  if (loading) {
    state = "loading";
    title = "loading Regulon list";
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }
  if (data) {
    state = "done";
  }

  return (
    <div>
      <Cover state={state}>
        <h1>{title}</h1>
      </Cover>
      {loading && (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <CircularProgress />
        </div>
      )}
      <div style={{ margin: "0 3% 0 3%" }}>
        {data && <Table regulons={data.getAllRegulon.data} />}
      </div>
    </div>
  );
}
function Table({ regulons }) {
  const data = useMemo(() => {
    return formatData(regulons);
  }, [regulons]);
  //console.log(data);
  return (
    <FilterTable columns={COLUMNS} data={data} fileName="RegulonsSummaryData" />
  );
}
