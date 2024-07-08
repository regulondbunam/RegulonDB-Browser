import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Collapse,
  Skeleton,
  Box,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IDObjectRDB from "ui-components/utils/IDParser";
import { useNavigate } from "react-router-dom";
import { gene, operon, tu, regulon } from "./queries";
import { gql, useQuery } from "@apollo/client";
import { DataVerifier } from "ui-components/utils";
import HTsite from "./HT";

export default function RelatedSites({ ids = [], gene, collapse = true }) {
  const [openSites, setOpenSites] = React.useState(collapse);

  let regulonName = undefined;
  let geneName = undefined;
  if (DataVerifier.isValidString(gene?.name)) {
    geneName = gene.name;
    try {
      regulonName = gene.name.charAt(0).toUpperCase() + gene.name.slice(1);
    } catch (error) {
      // :) ;)
    }
  }

  let sites = {};

  ids.forEach((id) => {
    const access = createUrlLabelObject(id);
    if (access) {
      if (sites[access.label]) {
        sites[access.label].push(access);
      } else {
        sites[access.label] = [access];
      }
    }
  });

  const handleClickSites = () => {
    setOpenSites(!openSites);
  };
  return (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton sx={{ pl: 1 }} dense onClick={handleClickSites}>
          <ListItemText
            primary={
              <Typography variant="irrelevantB">RELATED SITES</Typography>
            }
          />
          {openSites ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSites} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(sites).map((key) => (
            <Site key={"linkSite_" + key} label={key} access={sites[key]} />
          ))}
          {regulonName && geneName && (
            <HTsite regulonName={regulonName} geneName={geneName} />
          )}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function Site({ access = [], label = "" }) {
  const [openSites, setOpenSites] = React.useState(false);
  return (
    <React.Fragment>
      <ListItemButton
        sx={{ pl: 2 }}
        dense
        onClick={() => {
          setOpenSites(!openSites);
        }}
      >
        <ListItemText
          primary={<Typography variant="irrelevantB">{label}</Typography>}
        />
        {openSites ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSites} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {access.map((site, i) => {
            return (
              <Access key={"accesLink_" + site.label + "_" + i} {...site} />
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function Access({ url, label, id, objectType }) {
  const graph = getObjectTypeQuery(objectType, id);
  const { data, loading, error } = useQuery(graph.query, { ...graph.options });
  const nav = useNavigate();

  if (error) {
    console.error("error tu load basic info by", objectType, id, url);
    return null;
  }
  if (loading) {
    return (
      <ListItem dense>
        <ListItemText dense primary="loading related element.." />
        <Box sx={{ position: "absolute", width: "100%" }}>
          <Skeleton animation="pulse" variant="rectangular" height={30} />
        </Box>
      </ListItem>
    );
  }
  if (data) {
    const names = [...collectNames(data)];
    return (
      <ListItemButton
        sx={{ pl: 4 }}
        dense
        key={"accesLink_" + label + "_" + id}
        onClick={() => {
          nav(url);
        }}
      >
        <ListItemText
          primary={
            <Typography variant="irrelevantB">{names.join(", ")}</Typography>
          }
        />
      </ListItemButton>
    );
  }
  return null;
}

/**
 * Recursively collects all values of the `name` property in a given object,
 * and returns them as a Set to ensure uniqueness.
 *
 * @param {Object} obj - The input object to traverse.
 * @returns {Set} - A set of all unique `name` values found in the object.
 */
function collectNames(obj) {
  let names = new Set();

  /**
   * Helper function to recursively traverse the object.
   *
   * @param {Object} currentObj - The current object or array being traversed.
   */
  function traverse(currentObj) {
    if (Array.isArray(currentObj)) {
      // If the current object is an array, iterate through each element
      currentObj.forEach((item) => traverse(item));
    } else if (typeof currentObj === "object" && currentObj !== null) {
      // If the current object is an object, iterate through each key
      for (const key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          if (key === "name") {
            // If the key is 'name', add its value to the names set
            names.add(currentObj[key]);
          } else {
            // Otherwise, recursively traverse the value of the key
            traverse(currentObj[key]);
          }
        }
      }
    }
  }

  // Start the traversal with the input object
  traverse(obj);

  return names;
}

/**
 * Return query data from objectType
 * @param {string} objectType - The object type code.
 * @return {object} The readable label for the object type.
 */
function getObjectTypeQuery(objectType, id) {
  const objectTypeMap = {
    GN: {
      query: gene,
      options: { variables: { advancedSearch: id + "[_id]", limit: 1 } },
    },
    TU: {
      query: tu,
      options: {
        variables: {
          advancedSearch: id + "[transcriptionUnits._id]",
          limit: 1,
        },
      },
    },
    TF: {
      query: regulon,
      options: { variables: { advancedSearch: id + "[_id]", limit: 1 } },
    },
    OP: {
      query: operon,
      options: { variables: { advancedSearch: id + "[_id]", limit: 1 } },
    },
    // Add more mappings as needed
  };
  return (
    objectTypeMap[objectType] || {
      query: gql``,
      options: { advancedSearch: null },
    }
  );
}

/**
 * Convert the object type code to a readable label.
 * @param {string} objectType - The object type code.
 * @return {object} The readable label for the object type.
 */
function getObjectTypeLabel(objectType) {
  const objectTypeMap = {
    GN: { link: "gene", label: "Gene" },
    TU: { link: "tu", label: "Transcription Unit" },
    TF: { link: "regulon", label: "Regulon" },
    OP: { link: "operon", label: "Operon" },
    // Add more mappings as needed
  };
  return objectTypeMap[objectType] || {};
}

/**
 * Create an object with URL and label based on the ID.
 * @param {string} id - The ID string to parse.
 * @return {Object} An object with the structure {url: "", label: ""}.
 * @throws Will throw an error if the ID format is invalid.
 */
function createUrlLabelObject(id) {
  try {
    const parser = new IDObjectRDB(id);
    const access = getObjectTypeLabel(parser.objectType);
    if (access?.label) {
      const url = `/${access.link}/${parser.completeId}`;
      const label = access.label;
      return {
        url,
        label,
        id: parser.completeId,
        objectType: parser.objectType,
      };
    }
    return undefined;
  } catch (error) {
    console.error(error.message);
    return undefined;
  }
}
