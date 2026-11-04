import React, { useMemo } from "react";
import {
  Cover,
  FilterTable,
  DataVerifier,
} from "../../components/ui-components";
import { Link } from "react-router-dom";
import ObjectListPage from "../../components/objectListPage";
import {useSearchParams} from "react-router-dom";
import {DEFAULT_ORGANISM_ID} from "../../utils/organismConstants";

const COLUMNS = (organismId) => [
  {
    id: "operonName",
    header: "Operon name",
    accessorKey: "_name",
    filter: "fuzzyText",
    cell: (info) => (
      <Link to={"/operon/" + info.row.original.id + "?organism=" + encodeURIComponent(organismId)}>
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
  const {
    objectsList,
    state,
    title,
  } = ObjectListPage({
    datamartType: "operon",
    title: "Operons",
  });

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
  const [searchParams] = useSearchParams();
  const organismId = searchParams.get("organism");
  const data = useMemo(() => {
    return formatData(objectsList);
  }, [objectsList]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }} >
      <FilterTable data={data} columns={COLUMNS(organismId)} fileName="GeneSummaryData" />
    </div>
  );
}
