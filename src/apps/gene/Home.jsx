import React, { useMemo } from "react";
import {
  Cover,
  DataVerifier,
  FilterTable,
} from "../../components/ui-components";
import { Link } from "react-router-dom";
import ObjectListPage from "../../components/objectListPage";

const COLUMNS = [
  {
    id: "geneName",
    header: "Name",
    accessorKey: "_name",
    size: 200,
    filter: "fuzzyText",
    cell: (info) => (
      <Link to={"/gene/" + info.row.original.id}>
        <span dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Link>
    ),
  },{
    id: "geneBNumber",
    header: "bnumber",
    accessorKey: "_bnumber",
    size: 150,
    filter: "fuzzyText"
  },
  {
    id: "geneSynonyms",
    header: "Synonyms",
    accessorKey: "_synonyms",
    size: 200,
    filter: "fuzzyText",
  },
  {
    id: "geneProduct",
    header: "Product(s)",
    accessorKey: "_product",
    size: 400,
    filter: "fuzzyText",
    cell: (info) => (
      <span dangerouslySetInnerHTML={{ __html: info.getValue() }} />
    ),
  },
];

function formatData(objectsList = []) {
  let data = [];
  if (DataVerifier.isValidArray(objectsList)) {
    objectsList.forEach(({ _id, name, bnumber, productsName, synonyms }) => {
      data.push({
        id: _id,
        _name: name,
        _bnumber: bnumber,
        _synonyms: DataVerifier.isValidArray(synonyms)
          ? synonyms.join(", ")
          : "",
        _product: DataVerifier.isValidArray(productsName)
          ? productsName.join(", ")
          : "",
      });
    });
  }
  return data;
}

export default function Home() {
  const {
    objectsList,
    state,
    title,
  } = ObjectListPage({
    datamartType: "gene",
    title: "Genes",
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

function LoadTable({ objectsList }) {
  const data = useMemo(() => {
    return formatData(objectsList);
  }, [objectsList]);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <FilterTable
        data={data}
        columns={COLUMNS}
        fileName="GeneSummaryData"
        rowLinkBase="/gene"
      />
    </div>
  );
}
