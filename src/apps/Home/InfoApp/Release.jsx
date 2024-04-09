import React from "react";
import Box from "@mui/material/Box";
import { gql, useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

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

export default function Release() {
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

        <Box >
          <div style={{ marginLeft: "10px" }}>
            {"date: " + dbInfo.releaseDate}
            {"RegulonDB version: " + dbInfo.regulonDBVersion}
            synchronized with:
            {"    - Ecocyc version: " + dbInfo.ecocycVersion}
            {"     - Lisen&Curate version: " + dbInfo.lcVersion}
            <Link to={"/releasesNote"}>
              <Typography color="secondary">Read release notes</Typography>
            </Link>
          </div>
        </Box>

    );
  }
  return null;
}