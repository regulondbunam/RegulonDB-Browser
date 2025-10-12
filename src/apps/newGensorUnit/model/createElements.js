import Graph from './Graph'

export default async function createElements(guData) {
  const nodes = {}
  const edges = {}
  const relationship = {}

  const reactions = guData?.reactions
  if(!reactions || (Array.isArray(reactions) && reactions.length === 0)){
    console.error("no reactions found: ",guData)
    return null
  }
  reactions.forEach((reaction)=>{
    nodes[`n-${reaction.number}`] = {
      group: 'nodes',
      data: { id: reaction.number, description: reaction.description, name: `re${reaction.number}`, number: reaction.number, pathwayComponents: reaction.pathwayComponents },
    }
    const components = reaction?.components
    if(!components || (Array.isArray(components) && components.length === 0)){
      console.error("no components components found: ",reaction)
      return
    }
    const _r = new Set([`n-${reaction.number}`])
    components.forEach((component, index) => {
      nodes[`n-${component.name}`] = {
        group: "nodes",
        data: {
          id: component.name,
          function: component.function,
          name: component.name,
          type: component.type,
        },
      };
      edges[`e-${reaction.number}-${component.name}`] = {
        group: "edges",
        data: {
          id: reaction.number + "-" + index,
          source: reaction.number,
          target: component.name,
        },
      };
      _r.add(`e-${reaction.number}-${component.name}`)
      _r.add(`n-${component.name}`)
    });
    relationship[`r-${reaction.number}`] = _r
  })
  console.log({ nodes, edges, relationship });
  return new Graph(nodes, edges, relationship)
}