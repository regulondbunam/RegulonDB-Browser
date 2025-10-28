import useGUData from "../viewmodel/useGUData";
import Style from "./guData.module.css"
import { Cover } from "../../../components/ui-components";
import {CircularProgress} from "@mui/material"

export default function GUData({ guId }) {

  const {
    guData,
    error,
    loading,
  } = useGUData(guId);

  if (loading) return <div className={Style.loadingContainer} ><CircularProgress /></div>;

  if (error) return <div>Error to load graph data...</div>;

  return (
    <div>
      <Cover>
        <h1>{`Gensor unit ${guData?.gensorUnit?.name || guId}`}</h1>
      </Cover>
      <div className={Style.main} >
        <div className={Style.leftBar} >Lateral Bar</div>
        <div>graph info</div>
      </div>
    </div>
  );
}
