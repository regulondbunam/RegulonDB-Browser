import {COLLECTION_NODES} from "./treeNodes";
import {DATASET_TYPE_NAME} from "../static";

function setStrategyNodes(strategyList, source, datasetType) {
  const strategyNodes = []
  for (const strategy of strategyList) {
    strategyNodes.push(
        {
          id: "source:" + source + "&datasetType:"+datasetType+"&experimentType:"+strategy,
          label: strategy,
        },
    );
  }
  return strategyNodes;
}

function setSourceNodes(source, source_list, datasetType) {
  const sourcesNode = []
  // console.log("HasSource: "+source+" sourceList: ", source_list["sources"]);
  if (source) {
    // console.log("HasSource: "+source+" sourceList: ", source_list["sources"][source]);
    const strategyList = source_list["sources"][source];
    let src_label = source;
    if (source === "PALSON") {
      src_label = "PALSSON";
    }
    sourcesNode.push(
        {
          id: "source:" + source + "&datasetType:"+datasetType,
          label: src_label,
          children: setStrategyNodes(strategyList, source, datasetType),
        }
    );
  }
  else{
    for (const source in source_list["sources"]) {
      // console.log("HasSource: "+source+" sourceList: ", source_list["sources"][source]);
      const strategyList = source_list["sources"][source];
      sourcesNode.push(
          {
            id: "source:" + source + "&datasetType:"+datasetType,
            label: source,
            children: setStrategyNodes(strategyList, source, datasetType),
          }
      );
    }
  }
  return sourcesNode
}

function setNodes(datasetType, source) {
  const initTreeData = []
  const sourceList = COLLECTION_NODES[datasetType];
  // console.log(datasetType, source, sourceList);
  initTreeData.push(
      {
        id: "datasetType:"+datasetType,
        label: DATASET_TYPE_NAME(datasetType),
        children: setSourceNodes(source, sourceList, datasetType),
      }
  );
  return initTreeData;
}

export default function useGetInitTree(datasetType, sources) {
  return  setNodes(datasetType, sources);
}