import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { List } from 'ui-components/Web/List';
import FilterTable from 'ui-components/Web/FilterTable';
const views = {
  list: {
    label: "List",
    tooltip: "view genes in list",
    component: List
  },
  table: {
    label: "Table",
    tooltip: "view genes in table",
    component: FilterTable
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
          <ButtonGroup size='small' color="secondary" variant="contained" aria-label="Basic button group">
            {Object.keys(views).map((key) => (
              <Tooltip title={views[key].tooltip}>
                <Button onClick={() => { setView(views[key]) }} >{views[key].label}</Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </div>
      </div>
      <List
        data={data}
        pagination />
    </div>
  )
}

/* 
      title=
*/