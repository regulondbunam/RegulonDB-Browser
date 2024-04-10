import React from "react";
import Box from "@mui/material/Box";
import { gql, useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

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

export default function Release({unTitle=false}) {
  const { data, loading, error } = useQuery(query_GetDataBaseInfo);
  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton variant="rectangular" />;
  }
  if (data) {
    const dbInfo = data.getDatabaseInfo[0];
    return (
      <Card sx={{minWidth: "250px"}} >
        {!unTitle &&(
          <Typography variant="body1" ><b>Release</b></Typography>
        )}
        <div style={{marginLeft: "10px"}} >
        <Typography variant="body2">{"Date: " + dbInfo.releaseDate}</Typography>
        <Typography variant="body2">{"Version: " + dbInfo.regulonDBVersion}</Typography>
        </div>
        <Typography variant="body2" >Synchronized with:</Typography>
        <div style={{marginLeft: "10px"}} >
        <Typography variant="body2">{"Ecocyc version: " + dbInfo.ecocycVersion}</Typography>
        <Typography variant="body2">{"Lisen&Curate version: " + dbInfo.lcVersion}</Typography>
        </div>
        <Link to={"/releasesNote"}>
          <Typography color="secondary">Read release notes</Typography>
        </Link>
      </Card>

    );
  }
  return null;
}