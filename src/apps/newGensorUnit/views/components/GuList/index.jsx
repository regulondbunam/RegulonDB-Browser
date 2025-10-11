import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Style from "./styles.module.css";
import useController from "./useController";


export default function GuList({ list, columnA = "", columnB = "" }) {
  const {
    handleFilterA,
    handleFilterB,
    filterA,
    filterB,
    rows,
  } = useController(list);

  return (
    <div>
      <table className={Style.table}>
        <thead>
          <tr>
            <th className={Style.columnHeaderA}>
              <p className={Style.textHeader}>{columnA}</p>
              <div style={{ padding: "3px 5px 3px 5px" }}>
                <TextField
                    fullWidth
                  sx={{backgroundColor: "white" }}
                  size="small"
                  label="Filter"
                  variant="filled"
                    value={filterA}
                    onChange={handleFilterA}
                />
              </div>
            </th>
            <th className={Style.columnHeaderB}>
              <p className={Style.textHeader}>{columnB}</p>
              <div style={{ padding: "3px 5px 3px 5px" }}>
                <TextField
                  fullWidth
                  sx={{backgroundColor: "white" }}
                  size="small"
                  label="Filter"
                  variant="filled"
                  value={filterB}
                  onChange={handleFilterB}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const { primary, secondary } = row;
            return (
              <tr key={"gu_row_" + index + "_" + row.label}>
                <td className={Style.columnA}>
                  <div className={Style.cellA}>
                    {primary?.id ? (
                      <Link to={"/gu/" + primary.id}>
                        <p className={Style.textA}>{primary.label}</p>
                      </Link>
                    ) : (
                      <p className={Style.textA}>{primary.label}</p>
                    )}
                  </div>
                </td>
                <td className={Style.columnB}>
                  {secondary.map((item, index) => {
                    if (item?.id) {
                      return (
                        <p
                          className={Style.guText}
                          key={"gu_row_secondary_" + index + "_" + item.id}
                        >
                          <Link to={"/gu/" + item.id}>{item.label}</Link>
                        </p>
                      );
                    }
                    return (
                      <p
                        className={Style.group}
                        key={"gu_row_secondary_" + index + "_" + item.label}
                      >
                        {item.label}
                      </p>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
