import React, { useMemo } from "react";
import {
  Cover,
  FilterTable,
  DataVerifier,
} from "../../components/ui-components";
import { useGetObjectList } from "../../components/webservices";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    id: "operonName",
    header: "Operon name",
    accessorKey: "_name",
    filter: "fuzzyText",
    cell: (info) => (
      <Link to={"/operon/" + info.row.original.id}>
        <span dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Link>
    ),
  },
  {
    id: "numberGenes",
    header: "Genes",
    accessorKey: "_genes",
    filter: "fuzzyText",
  },
  {
    id: "numberPromoters",
    header: "Promoters",
    accessorKey: "_promoters",
    filter: "fuzzyText",
  },
  {
    id: "numberTranscriptionUnit",
    header: "TUs",
    accessorKey: "_tus",
    filter: "fuzzyText",
  },
];

function formatData(objectsList = []) {
  let data = [];
  if (DataVerifier.isValidArray(objectsList)) {
    objectsList.forEach(({ _id, name, statistics }) => {
        const {genes, promoters, transcriptionUnits} = statistics
      data.push({
        id: _id,
        _name: name,
        _genes: genes,
        _promoters: promoters,
        _tus: transcriptionUnits
      });
    });
  }
  return data;
}

function Home() {
  const { objectsList, loading, error } = useGetObjectList({
    datamartType: "operon",
  });
  let state = "done";
  let title = "Operons";
  if (loading) {
    state = "loading";
    title = "loading operon list";
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }

  return (
    <div>
      <Cover state={state}>
        <h1>{title}</h1>
      </Cover>
      {objectsList && <LoadTable objectsList={objectsList} />}
    </div>
  );
}

export default Home;

function LoadTable({ objectsList }) {
  const data = useMemo(() => {
    return formatData(objectsList);
  }, [objectsList]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }} >
      <FilterTable data={data} columns={COLUMNS} fileName="GeneSummaryData" />
    </div>
  );
}
