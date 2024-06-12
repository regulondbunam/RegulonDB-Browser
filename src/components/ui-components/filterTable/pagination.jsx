import Button from "@mui/material/Button";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Tooltip, ButtonGroup, Box } from "@mui/material";

export default function Pagination({ table }) {

    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", flexDirection: "row-reverse" }}>
            <ButtonGroup
                variant="contained"
                size="small"
                color="secondary"
                sx={{ height: "25px" }}
            >
                <Tooltip title="First Page" >
                    <Button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <FirstPageIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Prev Page" >
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </Button>
                </Tooltip>
                <Box sx={{
                    width: "30px",
                    display: " flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#C98528",
                    color: "white",
                    borderRight: "1px solid rgb(140, 93, 28)"
                }} >
                    <p style={{color:"white"}} ><b>{table.getState().pagination.pageIndex + 1}</b></p>
                </Box>
                <Tooltip title="Next Page" >
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </Button>
                </Tooltip>
                <Tooltip title="Last Page" >
                    <Button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <LastPageIcon />
                    </Button>
                </Tooltip>

            </ButtonGroup>

        </div>
    )
}

/*
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
*/