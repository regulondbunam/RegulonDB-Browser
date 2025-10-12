const membraneElement = (nodesId) => {
  const nodeStyle = {
    shape: "rectangle",
    width: 10,
    height: 10,
    "background-color": "#16a34a",
    "border-width": 0,
  };

  const edgeStyle = {
    width: 1,
    "line-color": "#16a34a",
  };

  return [
    {
      group: "nodes",
      data: { id: nodesId.a.id },
      position: nodesId.a.position,
      style: nodeStyle,
      grabbable: false,
    },
    {
      group: "nodes",
      data: { id: nodesId.aa.id },
      position: nodesId.aa.position,
      style: nodeStyle,
      grabbable: false,
    },
    {
      group: "edges",
      data: { id: `e-${nodesId.a.id}-${nodesId.aa.id}`, source: nodesId.a.id, target: nodesId.aa.id },
      style: edgeStyle,
      grabbable: false,
    },
    {
      group: "nodes",
      data: { id: nodesId.b.id },
      position: nodesId.b.position,
      style: nodeStyle,
      grabbable: false,
    },
    {
      group: "nodes",
      data: { id: nodesId.bb.id },
      position: nodesId.bb.position,
      style: nodeStyle,
      grabbable: false,
    },
    {
      group: "edges",
      data: { id: `e-${nodesId.b.id}-${nodesId.bb.id}`, source: nodesId.b.id, target: nodesId.bb.id },
      style: edgeStyle,
      grabbable: false,
    },
  ];
};

export default membraneElement;
