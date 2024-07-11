import React, { useReducer } from "react";
import SearchList from "./SearchList";
import { useGetAllRegulonsSummary } from "webServices/queries";
import { Cover } from "ui-components/Web/Cover";
import Typography from "@mui/material/Typography";
import { DataVerifier } from "ui-components/utils";
import RegulonViews from "./Regulon";
import Divider from "@mui/material/Divider";
import style from "./style.module.css";
import { DISPATCH, VIEW_TYPE } from "./static";
import { useNavigate } from "react-router-dom";

async function process(data, search = "", nav = () => {}) {
  let list = [];
  let table = {
    columns: [
      { key:"name", label: "Name", width: 600 },
      { key:"genes", label: "Genes" },
      { key:"operons", label: "Operons" },
      { key:"tf", label: "Transcription Factor" },
      { key:"tu", label: "Transcription Units" },
      { key:"ri", label: "Regulatory Interaction" },
      { key:"bs", label: "Binding Sites" },
    ],
    data: [],
  };
  if (DataVerifier.isValidArray(data)) {
    data.forEach((regulon) => {
      const id = regulon._id;
      const name = `${regulon.regulator.name} ${DataVerifier.isValidString(regulon.regulator.abbreviatedName) ? "("+regulon.regulator.abbreviatedName+")": ""}`
      let genes = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"genes")) {
        genes = DataVerifier.isValidNumber(regulon.summary.genes?.total) ? regulon.summary.genes?.total : 0
      }
      let operons = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"operons")) {
        operons = DataVerifier.isValidNumber(regulon.summary.operons?.total) ? regulon.summary.operons?.total : 0
      }
      let tf = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"transcriptionFactors")) {
        tf = DataVerifier.isValidNumber(regulon.summary.transcriptionFactors?.total) ? regulon.summary.transcriptionFactors?.total : 0
      }
      let tu = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"transcriptionUnits")) {
        tu = DataVerifier.isValidNumber(regulon.summary.transcriptionUnits?.total) ? regulon.summary.transcriptionUnits?.total : 0
      }
      let ri = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"regulatoryInteractions")) {
        ri = DataVerifier.isValidNumber(regulon.summary.regulatoryInteractions?.total) ? regulon.summary.regulatoryInteractions?.total : 0
      }
      let bs = 0
      if (DataVerifier.isValidObjectWithProperty(regulon.summary,"bindingSites")) {
        bs = DataVerifier.isValidNumber(regulon.summary.bindingSites?.total) ? regulon.summary.bindingSites?.total : 0
      }
      table.data.push({
        id: id,
        name: (
          <p
            value={name}
            dangerouslySetInnerHTML={{ __html: name }}
          />
        ),
        genes: genes,
        operons: operons,
        tf:tf,
        tu:tu,
        ri:ri,
        bs:bs,
        _properties: {
          onClick: () => {
            nav("/regulon/" + id);
          },
        },
      });
      list.push({
        _id: id,
        data: regulon,
        type: "regulon",
        primary: name,
        secondary: ``,
        _properties: {
          onClick: () => {
            nav("/regulon/" + id);
          },
        },
      });
    });
  }
  //list.sort((a, b) => b.score - a.score);
  //delay for state in program is very important
  await setTimeout(() => {}, 100);
  return { list, table };
}

const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH.SET_LOADING:
      const { loading } = action;
      return { ...state, loading: loading };
    case DISPATCH.SET_REGULON_LIST:
      const { regulonList, regulonTable } = action;
      return {
        ...state,
        regulonList: regulonList,
        regulonTable: regulonTable,
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
    regulonList: [],
    regulonTable: {},
    search: "",
    advanceSearch: {},
    viewType: VIEW_TYPE.TABLE,
  });
  const nav = useNavigate();

  const { loading: objectListLoading, error } = useGetAllRegulonsSummary((data) => {
    process(data, state.search, nav)
      .then((regulon) => {
        dispatch({
          type: DISPATCH.SET_REGULON_LIST,
          regulonList: regulon.list,
          regulonTable: regulon.table,
        });
      })
      .catch(() => {
        dispatch({ type: DISPATCH.SET_LOADING, loading: false });
      });
    dispatch({ type: DISPATCH.SET_LOADING, loading: true });
  });

  const loading = objectListLoading || state.loading;

  //console.log(state);
  return (
    <div>
      <Cover
        state={loading ? "loading" : "done"}
        message={error && "Error to load gene list"}
      >
        <Typography variant="h1" sx={{ ml: "10%" }}>
          Regulon
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
         <RegulonViews loading={loading} state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}
