import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import {
  SimpleTreeView,
  TreeItem,
} from "@mui/x-tree-view";

const OrganismTree = ({
  tree,
  selectedOrganismId,
  onChange,
}) => {

  return (
    <SimpleTreeView>

      {Object.entries(tree).map(
        ([speciesName, strains]) => (

          <TreeItem
            key={speciesName}
            itemId={`species-${speciesName}`}
            label={speciesName}
          >

            {Object.entries(strains).map(
                ([strainName, entries]) => {

                    const hasSingleEntry =
                    entries.length === 1;

                    if (hasSingleEntry) {

                    const organism =
                        entries[0];

                    const isSelected =
                        selectedOrganismId ===
                        organism._id;

                    const label =
                        organism.type ===
                        "chromosome"
                        ? `${strainName} (Chromosome)`
                        : `${strainName} (${organism.plasmidName})`;

                    return (
                        <TreeItem
                        key={organism._id}
                        itemId={organism._id}
                        onClick={() =>
                            onChange(
                            organism._id
                            )
                        }
                        label={
                            <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                            >
                            <Typography 
                                variant="body2"
                                sx={{
                                    color: "black"
                            }}>
                                {label}
                            </Typography>

                            {isSelected && (
                                <CheckIcon
                                sx={{
                                    color: "#32617D",
                                    fontSize: 18,
                                }}
                                />
                            )}
                            </Box>
                        }
                        />
                    );
                    }

                    return (
                    <TreeItem
                        key={`${speciesName}-${strainName}`}
                        itemId={`strain-${speciesName}-${strainName}`}
                        label={strainName}
                    >

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
                            <TreeItem
                                key={organism._id}
                                itemId={organism._id}
                                onClick={() =>
                                onChange(
                                    organism._id
                                )
                                }
                                label={
                                <Box
                                    sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    }}
                                >
                                    <Typography variant="body2">
                                    {label}
                                    </Typography>

                                    {isSelected && (
                                    <CheckIcon
                                        sx={{
                                        color: "#32617D",
                                        fontSize: 18,
                                        }}
                                    />
                                    )}
                                </Box>
                                }
                            />
                            );
                        }
                        )}

                    </TreeItem>
                    );
                }
                )}

          </TreeItem>

        )
      )}

    </SimpleTreeView>
  );
};

export default React.memo(
  OrganismTree
);