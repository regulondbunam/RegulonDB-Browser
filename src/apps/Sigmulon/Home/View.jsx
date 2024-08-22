import React from 'react'
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { List } from 'ui-components/Web/List';
import FilterTable from 'ui-components/Web/FilterTable';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TableChartIcon from '@mui/icons-material/TableChart';
import { DISPATCH, VIEW_TYPE } from './static';

const views = {
  list: {
    label: "List",
    tooltip: "view sigmulons in list",
    icon: <TableRowsIcon />,
  },
  table: {
    label: "Table",
    tooltip: "view sigmulons in table",
    icon: <TableChartIcon />,
  }
}

export default function View({ loading = false, dispatch, state }) {
  const view = views[state.viewType]
  const handleSelectView = (viewType) => {
    dispatch({ type: DISPATCH.UPDATE_VIEW, viewType: viewType })
  }
  //console.log(state);
  

  return (
    <div style={{ margin: "0 3% 0 15px", height: "100%" }}>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }} >
        <div>
          {loading ? (<>
            <Typography variant="irrelevant" component="div">
              {"loading..."}
            </Typography>
          </>) : (
            <Typography variant="relevant" component="div">
              {state.resultsSearch === null ? state.sigmulonList.length : state.resultsSearch.list.length}{" sigmulons"}
            </Typography>
          )}
        </div>
        <div>
          <ButtonGroup size='small' aria-label="Basic button group">
            {Object.keys(views).map((key) => (
              <Tooltip key={"button_"+views[key].label} title={views[key].tooltip}>
                <Button variant={view.label === views[key].label ? "contained" : "outlined"} onClick={() => { handleSelectView(key) }} >{views[key].icon}</Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </div>
      </div>
      {loading ? (<LinearProgress />) : (
        <div id='filterTableContainer' style={{ height: "100%" }} >
          {state.viewType === VIEW_TYPE.LIST && (
            <List
              data={state.resultsSearch === null ? state.sigmulonList : state.resultsSearch.list}
              idContainer="filterTableContainer"
            />
          )}
          {state.viewType === VIEW_TYPE.TABLE && (
            <FilterTable
            selection='row'
              data={state.resultsSearch === null ? state.sigmulonTable.data : state.resultsSearch.table.data}
              columns={state.resultsSearch === null ? state.sigmulonTable.columns : state.resultsSearch.table.columns}
              idContainer="filterTableContainer"
              pagination />
          )}
        </div>
      )}


    </div>
  )
}

/* 
            <GeneList loading={loading} data={state.resultsSearch === null ? state.geneList : state.resultsSearch} />

*/