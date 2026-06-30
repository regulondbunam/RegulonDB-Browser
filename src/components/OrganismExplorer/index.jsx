import React, { useMemo, useState } from "react";

import {
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";

import { buildOrganismTree } from "./utils/buildOrganismTree";
import {
  getOrganismDisplayName,
  getRecentOrganismLabel,
} from "./utils/getOrganismDisplayName";

const OrganismExplorer = ({
  organisms = [],
  selectedOrganismId,
  recentOrganisms = [],
  onChange,
}) => {
  const tree = useMemo(
    () => buildOrganismTree(organisms),
    [organisms]
  );

  return (
    <Box
      sx={{
        width: 400,
        maxHeight: 600,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "white",
          mb: 1,
        }}
      >
        Current Organism
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#32617D",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {getOrganismDisplayName(
          organisms.find(
            (o) => o._id === selectedOrganismId
          )
        )}
      </Typography>

      {recentOrganisms.length > 0 && (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  mb: 1,
                }}
              >
                Recently Used
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
              {recentOrganisms.map((organism) => (
                <Chip
                  key={organism._id}
                  label={getRecentOrganismLabel(
                    organism
                  )}
                  onClick={() =>
                    onChange(organism._id)
                  }
                />
              ))}
            </Box>
          </>
        )}

        {Object.entries(tree).map(
          ([speciesName, strains]) => (
            <Accordion
              key={speciesName}
              disableGutters
              defaultExpanded={false}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon />
                }
              >
                <Typography>
                  {speciesName}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {Object.entries(strains).map(
                  ([strainName, entries]) => (
                    <Accordion
                      key={strainName}
                      disableGutters
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon />
                        }
                      >
                        <Typography>
                          {strainName}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <List dense>
                          {entries.map(
                            (organism) => {
                              const isSelected =
                                selectedOrganismId ===
                                organism._id;

                              const label =
                                organism.type ===
                                "chromosome"
                                  ? "Chromosome"
                                  : `${organism.plasmidName} (Plasmid)`;

                              return (
                                <ListItemButton
                                  key={
                                    organism._id
                                  }
                                  selected={
                                    isSelected
                                  }
                                  onClick={() =>
                                    onChange(
                                      organism._id
                                    )
                                  }
                                >
                                  <ListItemText
                                    primary={
                                      label
                                    }
                                  />

                                  {isSelected && (
                                    <CheckIcon
                                      sx={{
                                        color:
                                          "#32617D",
                                      }}
                                    />
                                  )}
                                </ListItemButton>
                              );
                            }
                          )}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </AccordionDetails>
            </Accordion>
          )
        )}
    </Box>
  );
};

export default OrganismExplorer;