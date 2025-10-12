import Graph from "./Graph";

export default async function createElements(guData,width,height) {
  const nodes = {};
  const edges = {};
  const relationship = {};
  const genes = new Set();
  const nodeReactions = {};
  const transcription_factor = new Set();

  const reactions = guData?.reactions;
  if (!reactions || (Array.isArray(reactions) && reactions.length === 0)) {
    console.error("no reactions found: ", guData);
    return null;
  }
  reactions.forEach((reaction) => {
    nodes[`n-${reaction.number}`] = {
      group: "nodes",
      data: {
        id: reaction.number,
        description: reaction.description,
        name: `re${reaction.number}`,
        number: reaction.number,
        pathwayComponents: reaction.pathwayComponents,
        type: 'reaction-node'
      },
    };
    const components = reaction?.components;
    if (!components || (Array.isArray(components) && components.length === 0)) {
      console.error("no components components found: ", reaction);
      return;
    }
    const _r = new Set([`n-${reaction.number}`]);
    components.forEach((component, index) => {
      const componentName = component.name;
      nodes[`n-${componentName}`] = {
        group: "nodes",
        data: {
          id: componentName,
          function: component.function,
          name: componentName,
          type: component.type,
        },
      };
      edges[`e-${reaction.number}-${componentName}`] = {
        group: "edges",
        data: {
          id: reaction.number + "-" + index,
          source: reaction.number,
          target: componentName,
          type: component.type,
        },
      };
      if (nodeReactions[`n-${componentName}`]) {
        nodeReactions[`n-${componentName}`].add(`r-${reaction.number}`);
      } else {
        nodeReactions[`n-${componentName}`] = new Set([`r-${reaction.number}`]);
      }
      if (component.type === "gene") {
        genes.add(`n-${componentName}`);
      }
      if (component.type === "transcription_factor") {
        transcription_factor.add(`n-${componentName}`);
      }
      _r.add(`e-${reaction.number}-${componentName}`);
      _r.add(`n-${componentName}`);
    });
    relationship[`r-${reaction.number}`] = _r;
  });
  console.log({
    nodes,
    edges,
    relationship,
    genes,
    nodeReactions,
    transcription_factor,
  });
  return new Graph(
    width,height,
    nodes,
    edges,
    relationship,
    genes,
    nodeReactions,
    transcription_factor,
  );
}
