import { Cover } from "../../../components/ui-components";
import Style from "./home.module.css"
import { Link } from "react-router-dom";
import getText from "../static/getText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useHomeVM from "../viewmodel/useHomeVM";
import Divider from "@mui/material/Divider";
import GuList from "./components/GuList";

export default function Home() {

  const {
    SORT_OPTIONS,
    guList,
    option,
    error,
    loading,
    setOption,
  } = useHomeVM()

  return (
    <div>
      <Cover state={error ? "error" : loading ? "loading" : "done"} >
        <h1>Gensor Units</h1>
      </Cover>
      <div className={Style.body} >
        <div className={Style.definitionDiv} >
          <p className={Style.definitionText} >{getText("home.definition")}</p>
        </div>
        <div>
          <p>{getText("home.help.guList")}</p>
        </div>
        <div className={Style.sortDiv} >
          <p className={Style.sotText} >Gensor Unit sorted by</p>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={option}
            variant="outlined"
            label="groupBy"
            size="small"
            onChange={(e)=>{setOption(e.target.value);}}
          >
            {SORT_OPTIONS.map((option, index) => (
              <MenuItem key={"gu_sort_option"+index} value={index}>{option}</MenuItem>
            ))}
          </Select>
        </div>
        <Divider/>
        {guList[option].length !== 0 && (
          <GuList list={guList[option]} columnA={SORT_OPTIONS[option]} columnB={SORT_OPTIONS[option === 0 ? 1 : 0]} />
        )}
      </div>
    </div>
  );
}
