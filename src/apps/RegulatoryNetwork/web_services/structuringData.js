export const FormatData = (data) => {
  let nodes = [];
  let edges = [];

  const CreateNodesRecursive = (query, child = false, parent = false) => {
    query.forEach((element) => {
      let dataNodeObject = {
        data: {
          id: element._id,
          label: element.name,
          network: element.type,
          isChild: child,
          isParent: parent,
          effect: element.regulatoryEffect,
        },
      };

      nodes.push(dataNodeObject);

      element.hasOwnProperty("indegree") === true &&
        CreateNodesRecursive(element.indegree, false, true);

      element.hasOwnProperty("outdegree") === true &&
        CreateNodesRecursive(element.outdegree, true, false);
    });
  };
  CreateNodesRecursive(data.getNodesOf);

  let dataEdgeObject;
  nodes.slice(1, nodes.length).forEach((element) => {
    if (element.data.isParent) {
      dataEdgeObject = {
        data: {
          source: element.data.id,
          sourceLabel: element.data.label,
          target: nodes[0].data.id,
          targetLabel: nodes[0].data.label,
          effect: element.data.effect,
        },
      };
    } else if (element.data.isChild) {
      dataEdgeObject = {
        data: {
          source: nodes[0].data.id,
          sourceLabel: nodes[0].data.label,
          target: element.data.id,
          targetLabel: element.data.label,
          effect: element.data.effect,
        },
      };
    }
    edges.push(dataEdgeObject);
  });

  let netWork = {
    nodes: nodes,
    edges: edges,
  };

  return netWork;
};
