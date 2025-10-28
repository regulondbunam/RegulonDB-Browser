import {CircularProgress, Tabs, Tab, Typography} from "@mui/material"
import useGUData from "../viewmodel/useGUData";
import Style from "./guData.module.css"
import Summary from "./Summary";


export default function GUData({ guId }) {

  const {
    tab,
    TABS,
    handleChangeTab,
    guData,
    error,
    loading,
  } = useGUData(guId);

  if (loading) return <div className={Style.loadingContainer} ><CircularProgress /></div>;

  if (error) return <div>Error to load graph data...</div>;

  return (
    <div>
      <div className={Style.cover} >
        <Typography variant="h1" component="h1" color={"white"}>
          {`Gensor unit ${guData?.gensorUnit?.name || guId}`}
        </Typography>
      </div>
      <div>
        <Tabs value={tab} onChange={handleChangeTab} variant="scrollable" scrollButtons="auto" >
          {TABS.map((tabName, index) => (
            <Tab key={tabName+"_"+index} label={tabName} value={index}  />
          ))}
        </Tabs>
        {tab === 0 && <Summary guData={guData} />}
      </div>
    </div>
  );
}
