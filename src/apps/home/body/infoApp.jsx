import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { gql, useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BarChartIcon from "@mui/icons-material/BarChart";

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

export function Summary(params) {
  const { data, loading, error } = useQuery(query_GetDataBaseStatistics);
  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton variant="rectangular" />;
  }
  if (data) {
    const statistics = data.getDatabaseInfo[0].statistics;
    let allRegulons = 0
    Object.keys(statistics.regulons).forEach((key)=>{
      if (Number.isInteger(statistics.regulons[key].total)) {
        allRegulons += statistics.regulons[key].total
      }
    })
    return (
      <Box >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BarChartIcon />
          <p>
            <b>Summary</b>
          </p>
        </div>
        <div style={{ marginLeft: "10px" }}>
          {statistics.genes?.total && (
            <p>
              <b>{statistics.genes.total}</b>{" "}Genes
            </p>
          )}
          {statistics.operon?.total && (
              <p>
                <b>{statistics.operon.total}{" "}</b>Operons
              </p>
            )}
              <p>
                <b>{allRegulons}</b>{" "}Regulons
              </p>
          {statistics.transcriptionUnits?.total && (
              <p>
                <b>{statistics.transcriptionUnits.total}</b>{" "}Transcription Units
              </p>
            )}
            {statistics.promoters?.total && (
              <p>
                <b>{statistics.promoters.total}</b>{" "}Promoters
              </p>
            )}
        </div>
      </Box>
    );
  }
  return null;
}

export function ReleaseInfo() {
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <NewspaperIcon />
          <p>
            <b>Release</b>
          </p>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <p>{"Date: " + dbInfo.releaseDate} </p>
          <p>{"RegulonDB version: " + dbInfo.regulonDBVersion} </p>
          <p>Synchronized with:</p>
          <p>{"- Ecocyc version: " + dbInfo.ecocycVersion}</p>
          <p>{"- Lisen&Curate version: " + dbInfo.lcVersion}</p>
          <Link to={"/releasesNote"}>
            <Typography color="secondary">Read release notes</Typography>
          </Link>
        </div>
      </Box>
    );
  }
  return null;
}
