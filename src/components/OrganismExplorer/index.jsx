import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  Box,
  Typography,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Divider
} from "@mui/material";

import BiotechIcon from "@mui/icons-material/Biotech";

import { buildOrganismTree } from "./utils/buildOrganismTree";
import { getOrganismDisplayName, getRecentOrganismLabel } from "./utils/getOrganismDisplayName";
import { searchOrganisms } from "./utils/searchOrganisms";
import { getCurrentOrganismLabel } from "./utils/organismLabels";
import OrganismTree from "./utils/organismTree";


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

const [ searchTerm, setSearchTerm] = useState("");

const [ debouncedSearch, setDebouncedSearch ] = useState("");

useEffect(() => {
  const timeout = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 250);

  return () => clearTimeout(timeout);
}, [searchTerm]);

const searchResults = useMemo(
  () =>
    searchOrganisms(
      organisms,
      debouncedSearch
    ),
  [
    organisms,
    debouncedSearch,
  ]
);

const isSearching =
  searchTerm.trim().length >= 3;

  return (
    <Box
      sx={{
        width: 400,
        maxHeight: 600,
        overflowY: "auto"
      }}
    >
      <Box
        sx={{
          backgroundColor: "#32617D",
          color: "white",
          p: 2,
          mb: 2,
          borderRadius: 1,
        }}
      >
      <Typography
        variant="body2"
        sx={{
          color: "white !important",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Current Organism
      </Typography>

      <Chip
        icon={
          <BiotechIcon
            sx={{
              color: "white !important",
            }}
          />
        }
        label={getOrganismDisplayName(
          organisms.find(
            (o) =>
              o._id === selectedOrganismId
          )
        )}
        sx={{
          mb: 2,
          maxWidth: "100%",

          backgroundColor: "#32617D",
          color: "white",

          border: "1px solid white",

          "& .MuiChip-label": {
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      />
      </Box>

      {recentOrganisms.length > 0 && (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: "#32617D",
                  fontWeight: "bold",
                  mb: 1,
                  px: 1
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
                  px: 1,
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
                  sx={{
                    backgroundColor: "#32617D",
                    color: "white",
                    fontWeight: 600,

                    "&:hover": {
                      backgroundColor: "#2A5168",
                    },
                  }}
                />
              ))}
            </Box>
          </>
        )}

        <Divider sx={{ my: 2 }} />
        <TextField
          fullWidth
          size="small"
          label="Search organism"
          value={searchTerm}
          sx={{
            px: 1,
          }}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
        />
        {searchResults.length > 0 && (

        <List dense>

          {searchResults.map(
            (organism) => (

              <ListItemButton
                key={organism._id}
                onClick={() =>
                  onChange(
                    organism._id
                  )
                }
              >

                <ListItemText
                  primary={
                    getCurrentOrganismLabel(
                      organism
                    )
                  }
                />

              </ListItemButton>

            )
          )}

        </List>

      )}
      {isSearching &&
        searchResults.length === 0 && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "text.secondary",
              px: 1,
              py: 1,
            }}
          >
            No organisms found
          </Typography>
        )}

        {!isSearching && (
          <OrganismTree
            tree={tree}
            selectedOrganismId={
              selectedOrganismId
            }
            onChange={onChange}
          />
        )}
    </Box>
  );
};

export default OrganismExplorer;