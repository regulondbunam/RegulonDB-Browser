import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { List } from 'ui-components/Web/List';
import FilterTable from 'ui-components/Web/FilterTable';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TableChartIcon from '@mui/icons-material/TableChart';

const views = {
  list: {
    label: "List",
    tooltip: "view genes in list",
    component: List,
    icon: <TableRowsIcon/>,
  },
  table: {
    label: "Table",
    tooltip: "view genes in table",
    component: FilterTable,
    icon: <TableChartIcon/>,
  }
}

export default function GeneList({ data, loading = false }) {
  const [view, setView] = useState(views.list)
  const { label, component } = view
  return (
    <div style={{ padding: "16px 3% 16px 15px" }}>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }} >
        <div>
          {loading ? (<>
            <Typography variant="irrelevant" component="div">
              {"loading..."}
            </Typography>
          </>) : (
            <Typography variant="relevant" component="div">
              {"" + data.length + " genes"}
            </Typography>
          )}
        </div>
        <div>
          <ButtonGroup size='small'   aria-label="Basic button group">
            {Object.keys(views).map((key) => (
              <Tooltip title={views[key].tooltip}>
                <Button variant={view.label===views[key].label ? "contained":"outlined"} onClick={() => { setView(views[key]) }} >{views[key].icon}</Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </div>
      </div>
      {loading && (<LinearProgress />)}
      <List
        data={data}
        pagination />
    </div>
  )
}

/* 
      title=
*/