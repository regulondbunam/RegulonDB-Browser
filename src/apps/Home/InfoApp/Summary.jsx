import React from "react";
import { gql, useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';


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

export default function Summary({ unTitle = false }) {
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
      <Card sx={{ minWidth: "250px" }} >
        {!unTitle && (
          <Typography variant="body1" >
            <b>Summary</b>
          </Typography>
        )}

        <div style={{ marginLeft: "10px" }}>
          {statistics.genes?.total && (
            <Typography>
              <b>{statistics.genes.total}</b>{" "}Genes
            </Typography>
          )}
          {statistics.operon?.total && (
            <Typography>
              <b>{statistics.operon.total}{" "}</b>Operons
            </Typography>
          )}
          {statistics.regulons?.total && (
            <Typography>
              <b>{statistics.regulons.total}</b>{" "}Regulons
            </Typography>
          )}
          {statistics.transcriptionUnits?.total && (
            <Typography>
              <b>{statistics.transcriptionUnits.total}</b>{" "}Transcription Units
            </Typography>
          )}
          {statistics.promoters?.total && (
            <Typography>
              <b>{statistics.promoters.total}</b>{" "}Promoters
            </Typography>
          )}
        </div>
      </Card>
    );
  }
  return null;
}