import React from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import useGetInitTree from '../../WebServices/useGetTree';

function getTreeNodes(nodes) { //Gets nodes IDs to expand
  let expanded = []
  for (const node of nodes) {
    expanded.push(node.id);
    for (const child of node.children){
      expanded.push(child.id);
    }
  }
  // console.log("NODES TO ID", expanded);
  return expanded
}

export default function TreeView({
    updateDataset, datasetType, sources
  }){
    const handleSelectItem = (event, itemId) => {
      const info = itemId.split("&");
      let properties = {};
      for (const property of info) {
        const values = property.split(":")
        properties[values[0]] = values[1]
      }
      updateDataset(properties?.datasetType,properties?.source,properties?.experimentType)
    }
    const initTree = useGetInitTree(datasetType, sources)
    return (
      <Box>
        <RichTreeView
          items={initTree}
          onItemClick={handleSelectItem}
          defaultExpandedItems={getTreeNodes(initTree)}
          defaultSelectedItems={getTreeNodes(initTree)}

        />
      </Box>
    );
  }