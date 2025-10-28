
export default function processNodesAndEdges(reactions = []) {
  const edges = [];
  const nodes = [];

  if (!reactions || (Array.isArray(reactions) && reactions.length === 0)) {
    console.error("no reactions found");
    return null;
  }

  reactions.forEach((reaction) => {
    const reactionName = `R-${reaction.number}`;
    const reactionId = `n_${reactionName}`.trim().replace(/ /g, "_");
    nodes[reactionId] = {
      group: "nodes",
      data: {
        id: reactionId,
        description: reaction.description,
        name: reactionName,
        number: reaction.number,
        pathwayComponents: reaction.pathwayComponents,
        type: reaction.type,
      },
    }
    const components = reaction?.components;
    if (!components || (Array.isArray(components) && components.length === 0)) {
      console.error("no components components found: ", reaction);
      return;
    }
    components.forEach((component) => {
      const componentName = component.name;
      const componentId = `n_${componentName}`.trim().replace(/ /g, "_");
      const edgeId = `e_${reactionName}-${componentName}`.trim().replace(/ /g, "_");
      if(!Object.keys(nodes).includes(componentId)){
        nodes[componentId] = {
          group: "nodes",
          data: {
            id: componentId,
            name: componentName,
            type: component.type,
          },
        };
      }
      if(!Object.keys(edges).includes(edgeId)){
        const ReactionFunction = new Set([component.function]);
        edges[edgeId] = {
          group: "edges",
          data: {
            function: ReactionFunction,
            id: edgeId,
            source: reactionId,
            target: componentId,
          },
        };
      }else{
        edges[edgeId].data.function.add(component.function);
      }
    })
  })
  return {edges, nodes}
}