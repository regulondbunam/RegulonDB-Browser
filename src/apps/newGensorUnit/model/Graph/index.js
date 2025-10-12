export default class Graph {

  nodes = {};
  edges = {};
  relationship = {};

  constructor(nodes, edges, relationship) {
    this.nodes = nodes;
    this.edges = edges;
    this.relationship = relationship;
  }

  getReaction(reaction){
    const relation = this.relationship[`r-${reaction}`];
    if(!relation || (Array.isArray(relation) && relation.length ===0)) {
      console.error("Reaction not found: ",reaction);
      return [];
    }
    const _nodes = []
    const _edges = []
    relation.forEach((item)=>{
      const e = item.split('-')
      switch (e[0]) {
        case 'n':
          _nodes.push(this.nodes[item])
          break;
        case 'e':
          _edges.push(this.edges[item])
          break;
        default:
          console.error('Element not found: ', item, ' in reaction: ', reaction);
      }
    })
    return [..._nodes, ..._edges]
  }

}
