import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {Typography, Skeleton} from "@mui/material";
import genesIcon from "./media/genesIcon.png"
import operonIcon from "./media/operonIcon.png"
import regulonIcon from "./media/webRegulonIcon.png"
import tuIcon from "./media/TUicon.png"
import React from "react";

const query_GetDataBaseInfo = gql`
  {
    getDatabaseInfo {
      regulonDBVersion
      ecocycVersion
      lcVersion
      releaseDate
      note
    }
  }
`;

const query_GetDataBaseStatistics = gql`
  {
    getDatabaseInfo {
      statistics {
        genes {
          total
        }
        operon {
          total
        }
        regulons {
          regulatoryContinuant {
            total
          }
          srna {
            total
          }
          transcriptionFactor {
            total
          }
        }
        transcriptionUnits {
          total
        }
      }
    }
  }
`;

export default function Summary() {
    const {data: summaryData, loading: summaryLoad, error: summaryError} = useQuery(query_GetDataBaseStatistics);
    const {data: infoData, loading: infLoad, error: infoError } = useQuery(query_GetDataBaseInfo);
    if (summaryLoad || infLoad) return <SkeletonLoad />;
    if (summaryError || infoError) return <p>Error connect to database</p>;
    const statistics = summaryData.getDatabaseInfo[0].statistics;
    const dbInfo = infoData.getDatabaseInfo[0];

    let allRegulons = 0
    Object.keys(statistics.regulons).forEach((key)=>{
        if (Number.isInteger(statistics.regulons[key].total)) {
            allRegulons += statistics.regulons[key].total
        }
    })

    return (
        <div style={{padding: "5px", width: "100%"}}>
            <p style={{color: "black"}} ><b>Release & Summary</b></p>
            <div className={"home-cover-cards-summary-content"} style={{display: "flex"}}>
                <div style={{ marginLeft: "10px" }}>
                    <p>{"Date: " + dbInfo.releaseDate} </p>
                    <p>{"Version: " + dbInfo.regulonDBVersion} </p>
                    <p>Synchronized with:</p>
                    <p>{"- Ecocyc version: " + dbInfo.ecocycVersion}</p>
                    <p>{"- Lisen&Curate version: " + dbInfo.lcVersion}</p>
                    <Link to={"/releasesNote"}>
                        <Typography color="secondary">Read release notes</Typography>
                    </Link>
                </div>
                <div style={{ width:"100%", marginLeft: "10px", display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",}} >
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <img src={genesIcon} alt="geneIcon" style={{width: "auto", height: "50px", margin: "10px"}}/>
                        <p style={{color: "black"}}><b>{statistics?.genes?.total}</b></p>
                        <p style={{color: "black"}}>Genes</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <img src={operonIcon} alt="geneIcon" style={{width: "auto", height: "50px", margin: "10px"}}/>
                        <p style={{color: "black"}}><b>{statistics?.operon?.total}</b></p>
                        <p style={{color: "black"}}>Operon</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <img src={regulonIcon} alt="geneIcon" style={{width: "auto", height: "50px", margin: "10px"}}/>
                        <p style={{color: "black"}}><b>{allRegulons}</b></p>
                        <p style={{color: "black"}}>Regulon</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <img src={tuIcon} alt="geneIcon" style={{width: "auto", height: "50px", margin: "10px"}}/>
                        <p style={{color: "black"}}><b>{statistics?.transcriptionUnits?.total}</b></p>
                        <p style={{color: "black"}}>Transcription Units</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SkeletonLoad() {
    return (
        <div style={{padding: "5px"}} >
            <p style={{color: "black"}} ><b>Release & Summary</b></p>
            <div style={{display: "flex"}}>
                <div>
                    <Skeleton variant="text" width="150px" height="20px" />
                    <Skeleton variant="text" width="150px" height="20px" />
                    <Skeleton variant="text" width="150px" height="20px" />
                    <Skeleton variant="text" width="150px" height="20px" />
                    <Skeleton variant="text" width="150px" height="20px" />
                </div>
                <div style={{ width:"100%", marginLeft: "10px", display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",}} >
                    {Array.from({length: 4}).map((n,i)=><div key={"skeleton_" + i} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Skeleton variant="circular" width={100} height={100} />
                    </div>)}
                </div>
            </div>
        </div>
    )
}