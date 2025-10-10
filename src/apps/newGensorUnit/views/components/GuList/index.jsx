import { Link } from "react-router-dom";
import Style from "./styles.module.css"

export default function GuList({list,columnA="", columnB=""}){

  return(
    <div>
      <table className={Style.table} >
        <thead>
          <tr>
            <th className={Style.columnHeaderA} ><p className={Style.textHeader}>{columnA}</p></th>
            <th className={Style.columnHeaderB} ><p className={Style.textHeader}>{columnB}</p></th>
          </tr>
        </thead>
        <tbody>
        {list.map((row, index) => {
          const {primary, secondary} = row;
          return <tr key={"gu_row_"+index+"_"+row.name}>
            <td className={Style.columnA} >
              <div className={Style.cellA} >
                {primary?.id
                  ? <Link to={"/gu/" + primary.id}><p className={Style.textA} >{primary.label}</p></Link>
                  : <p className={Style.textA} >{primary.label}</p>
                }
              </div>
            </td>
            <td className={Style.columnB} >
              {secondary.map((item, index) => {
                if(item?.id){
                  return <p className={Style.guText} key={"gu_row_secondary_"+index+"_"+item.id} >
                    <Link  to={"/gu/" + item.id}>{item.label}</Link></p>
                }
                return <p className={Style.group} key={"gu_row_secondary_"+index+"_"+item.label}>{item.label}</p>
              })}
            </td>
          </tr>
        })}
        </tbody>
      </table>


    </div>
  )
}