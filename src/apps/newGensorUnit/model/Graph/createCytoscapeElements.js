export default async function createCytoscapeElements(guData) {
  const nodes = []
  const edges = []
  
  const reactions = guData?.reactions
  if(!reactions || (Array.isArray(reactions) && reactions.length === 0)){
    console.error("no reactions found: ",guData)
    return null
  }
  reactions.forEach((reaction)=>{
    nodes.push({
      group: 'nodes',
      data: { id: reaction.number, description: reaction.description, name: reaction.name, number: reaction.number, pathwayComponents: reaction.pathwayComponents },
    })
    const components = reaction?.components
    if(!components || (Array.isArray(components) && components.length === 0)){
      console.error("no components components found: ",reaction)
      return
    }
    components.forEach((component,index)=>{
      nodes.push({
        group: 'nodes',
        data: { id: component.name, function: component.function, name: component.name, type: component.type},
      })
      edges.push({
        group: 'edges',
        data: {
          id: reaction.number+"-"+index,
          source: reaction.number,
          target: component.name,
        },
      });
    })

  })
  return [...nodes, ...edges];
}