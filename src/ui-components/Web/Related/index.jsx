import React from "react";
import { useGetRelatedObjectsByID } from "./utils";
import RelatedSites from "./sites";
import RelatedTools from "./tools";
import RelatedExternal from "./externalSites";
import { List, ListItem, ListItemText, Skeleton, Box } from "@mui/material";
import IDObjectRDB from "ui-components/utils/IDParser";
import { collectIds } from "./utils";
import { OBJECT_TYPE } from "./static";

//import Operon from './sites/Operon';

function getObjectType(regulonDB_id) {
  try {
    return new IDObjectRDB(regulonDB_id);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default function RelatedList({
  collapse,
  regulonDB_id,
  leftEndPosition,
  rightEndPosition,
  gene,
  organism,
  objectType = "",
  tools = true,
  sites = true,
  external = false,
  externalCrossReferences,
}) {
  const IDObjectRDB = getObjectType(regulonDB_id);
  // console.log(regulonDB_id);
  const { ids, loading } = useGetRelatedObjectsByID(IDObjectRDB);
  if (loading) {
    return (
      <List disablePadding>
        <ListItem>
          <ListItemText primary="loading related elements.." />
          <Box sx={{ position: "absolute", width: "100%" }}>
            <Skeleton animation="pulse" variant="rectangular" height={30} />
          </Box>
        </ListItem>
      </List>
    );
  }

  return (
    <List disablePadding>
      {sites && <RelatedSites objectType={objectType} collapse={collapse} ids={ids} gene={gene} />}
      {tools && (
        <RelatedTools
          collapse={collapse}
          leftEndPosition={leftEndPosition}
          rightEndPosition={rightEndPosition}
          gene={gene}
          organism={organism}
          objectType={objectType}
        />
      )}
      {external && (
        <RelatedExternal
          collapse={collapse}
          externalCrossReferences={externalCrossReferences}
          objectType={objectType}
        />
      )}
    </List>
  );
}

export { getObjectType, collectIds, OBJECT_TYPE };
