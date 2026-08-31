import { Cover, AnchorNav } from "../../../components/ui-components";
import {
  useGetGenesBySearch,
  useGetGuBySearch,
  useGetOperonBySearch,
  useGetRegulonBySearch,
  useGetSigmulonBySearch,
} from "../../../components/webservices";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DataVerifier } from "../../../components/ui-components";
import ListResult from "./listResult";
import {
  operonFormatResults,
  geneFormatResults,
  regulonFormatResults,
  sigmulonFormatResults,
  gusFormatResults,
  goFormatResults,
} from "./dataProcess";
import CircularProgress from "@mui/material/CircularProgress";
import { Div } from "../../../components/ui-components/searchKeys/code";
import CoexpressionResults from "../coexpression";
import { useGetGOBySearch } from "../../../regulondb-ws/queries/GOTree";

export default function Results({ keyword, organismId }) {

  const DEFAULT_ORGANISM_ID = "RDBECOLIORC00001";

  const isDefaultOrganism = organismId === DEFAULT_ORGANISM_ID;

  let section = [
    GeneResult(keyword, organismId),
    RegulonResult(keyword, organismId),
  ];

  if (isDefaultOrganism) {
    section.push(OperonResult(keyword));
    section.push(SigmulonResult(keyword));
    section.push(GUsResult(keyword));
  }

  let title = `${keyword}`;

  if(/coexpression/.test(keyword)){
    return <CoexpressionResults keyword={keyword} />
}

  return (
    <div>
      <Cover>
        <br />
        <h1>Search in results {title} </h1>
        <div style={{ display: "grid", gridTemplateColumns: "70% 1% 20%" }}>
        </div>
      </Cover>
      <Div name={keyword} />
      <AnchorNav title="Results" sections={section} disabledSearchTool />
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function GOResult(keyword) {
  const {goTerms, loading, error} = useGetGOBySearch(keyword)
  let title = "Gene Ontology (0)";
  let results = [];
  if (DataVerifier.isValidArray(goTerms)) {
    results = goFormatResults(goTerms,keyword)
    title = "Gene Ontology (" + goTerms.length + ") ";
  }
  if (loading) {
    title = (
      <>
        GENSOR Unit <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_go",
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function GUsResult(keyword) {
  let title = "GENSOR Unit (0)";
  const { gusData, loading, error } = useGetGuBySearch(keyword);
  let results = [];
  if (DataVerifier.isValidArray(gusData)) {
    results = gusFormatResults(gusData, keyword);
    title = "GENSOR Unit (" + gusData.length + ") ";
  }
  if (loading) {
    title = (
      <>
        GENSOR Unit <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_gu",
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function GeneResult(keyword, organismId) {
  let type = "Gene";
  let title = type + " (0)";
  const {
    genesData: data,
    loading,
    error,
  } = useGetGenesBySearch({ search: keyword, organismId: organismId });
  let results = [];
  if (DataVerifier.isValidArray(data)) {
    results = geneFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
        organismId={organismId}
      />
    ),
  };
}

function OperonResult(keyword) {
  let type = "Operon";
  let title = type + " (0)";
  const {
    operonsData: data,
    loading,
    error,
  } = useGetOperonBySearch({ search: keyword });
  let results = [];
  if (DataVerifier.isValidArray(data)) {
    results = operonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function RegulonResult(keyword, organismId) {
  let type = "Regulon";
  let title = type + " (0)";
  const {
    regulonsData: data,
    loading,
    error,
  } = useGetRegulonBySearch({ search: keyword, organismId: organismId });
  let results = [];
  if (DataVerifier.isValidArray(data)) {
    results = regulonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function SigmulonResult(keyword) {
  let type = "Sigmulon";
  const {
    sigmulonData: data,
    loading,
    error,
  } = useGetSigmulonBySearch(keyword);
  //console.log(keyword);
  let results = [];
  let title = type + " (0)";
  if (DataVerifier.isValidArray(data)) {
    results = sigmulonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function Result({ keyword, error, loading, results, type, organismId }) {
  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {results.length > 0 && (
        <div style={{ marginLeft: "3%" }}>
          {DataVerifier.isValidArray(results) && (
            <ListResult results={results} organismId={organismId} />
          )}
        </div>
      )}
    </div>
  );
}
