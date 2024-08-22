import React, { useReducer } from "react";
import SearchList from "./SearchList";
import { useGetAllSigmulonMainDAta } from "webServices/queries";
import { Cover } from "ui-components/Web/Cover";
import Typography from "@mui/material/Typography";
//import { DataVerifier } from "ui-components/utils";
import View from "./View";
import Divider from "@mui/material/Divider";
import style from "./style.module.css";
import { DISPATCH, VIEW_TYPE } from "./static";
import { useNavigate } from "react-router-dom";
import { DataVerifier } from "ui-components/utils";

async function process(simulons, search = "", nav = () => {}) {
  let list = [];
  let table = {
    columns: [
      { key: "name", label: "Name", width: 600 },
      { key: "synonyms", label: "Synonyms" },
      { key: "gene", label: "Gene" },
      { key: "genes", label: "Genes" },
      { key: "promoters", label: "Promoters" },
      { key: "sigmaFactors", label: "Sigma Factors" },
      { key: "tus", label: "TUs" },
    ],
    data: [],
  };
  if (DataVerifier.isValidArray(simulons)) {
    for (const sigmulon of simulons) {
      //name
      const name = DataVerifier.isValidString(sigmulon?.sigmaFactor?.name) ? sigmulon.sigmaFactor.name : "";
      //synonyms
      const synonyms = DataVerifier.isValidArray(sigmulon?.sigmaFactor?.synonyms) ? sigmulon.sigmaFactor.synonyms.join(", ") : ""
      //gene
      const gene = DataVerifier.isValidObjectWith_id(sigmulon?.sigmaFactor?.gene) ? sigmulon.sigmaFactor.gene?.name : null;
      //genes
      const genes = DataVerifier.isValidNumber(sigmulon?.statistics?.genes) ? sigmulon.statistics.genes : ""
      //promoters
      const promoters = DataVerifier.isValidNumber(sigmulon?.statistics?.promoters) ? sigmulon.statistics.promoters : ""
      //sigmaFactors
      const sigmaFactors = DataVerifier.isValidNumber(sigmulon?.statistics?.sigmaFactors) ? sigmulon.statistics.sigmaFactors : ""
      //transcriptionUnits
      const transcriptionUnits = DataVerifier.isValidNumber(sigmulon?.statistics?.transcriptionUnits) ? sigmulon.statistics.transcriptionUnits : ""
      table.data.push({
        id: sigmulon._id,
        name,
        synonyms,
        gene,
        genes,
        promoters,
        sigmaFactors,
        transcriptionUnits,
        _properties: {
          onClick: () => {
            nav("/sigmulon/" + sigmulon._id);
          },
        },
      });
      list.push({
        _id: sigmulon._id,
        data: sigmulon,
        type: "sigmulon",
        primary: name,
        secondary: ``,
        _properties: {
          onClick: () => {
            nav("/sigmulon/" + sigmulon._id);
          },
        },
      });
    }
  }
  await setTimeout(() => {}, 100);
  return { list, table };
}

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH.SET_LOADING:
      const { loading } = action;
      return { ...state, loading: loading };
    case DISPATCH.SET_SIGMULON_LIST:
      const { sigmulonList, sigmulonTable } = action;
      return {
        ...state,
        sigmulonList: sigmulonList,
        sigmulonTable: sigmulonTable,
        loading: false,
      };
    case DISPATCH.SEARCH:
      const { search, resultsSearch } = action;
      return {
        ...state,
        search: search,
        resultsSearch: resultsSearch,
        loading: false,
      };
    case DISPATCH.CLEAN_SEARCH:
      return { ...state, search: "", resultsSearch: null };
    case DISPATCH.UPDATE_VIEW:
      return { ...state, viewType: action.viewType };
    default:
      return state;
  }
};

export default function Home({ query }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    resultsSearch: null,
    sigmulonList: [],
    sigmulonTable: {},
    search: "",
    advanceSearch: {},
    viewType: VIEW_TYPE.TABLE,
  });
  const nav = useNavigate();

  const { loading: objectListLoading, error } = useGetAllSigmulonMainDAta(
    (data) => {
      process(data, state.search, nav)
        .then((sigmulons) => {
          dispatch({
            type: DISPATCH.SET_SIGMULON_LIST,
            sigmulonList: sigmulons.list,
            sigmulonTable: sigmulons.table,
          });
        })
        .finally(() => {
          dispatch({ type: DISPATCH.SET_LOADING, loading: false });
        });
      dispatch({ type: DISPATCH.SET_LOADING, loading: true });
    }
  );

  const loading = objectListLoading || state.loading;

  console.log(state);
  return (
    <div>
      <Cover
        state={loading ? "loading" : "done"}
        message={error && "Error to load gene list"}
      >
        <Typography variant="h1" sx={{ ml: "10%" }}>
          Sigmulon
        </Typography>
      </Cover>
      <div
        className={style.geneLayout}
        style={{ height: `${window.screen.height - 180}px` }}
      >
        <div className={style.geneFilters}>
          <SearchList state={state} dispatch={dispatch} />
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ minWidth: "376px", width: "100%" }}>
        <View loading={loading} state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}
