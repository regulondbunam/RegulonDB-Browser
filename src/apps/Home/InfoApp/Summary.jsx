import React from "react";
import Box from "@mui/material/Box";
import { gql, useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BarChartIcon from "@mui/icons-material/BarChart";

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
          total
        }
        promoters {
          total
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
            {statistics.regulons?.total && (
                <p>
                  <b>{statistics.regulons.total}</b>{" "}Regulons
                </p>
              )}
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