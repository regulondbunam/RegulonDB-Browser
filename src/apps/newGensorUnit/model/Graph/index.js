export default class Graph {

  width = 0;
  height = 0;
  nodes = {};
  edges = {};
  relationship = {};
  nodeReactions = {};
  genes;
  transcription_factor;

  constructor(width,height,nodes, edges, relationship, genes, nodeReactions, transcription_factor) {
    this.width = width;
    this.height = height;
    this.nodes = nodes;
    this.edges = edges;
    this.relationship = relationship;
    this.genes = genes;
    this.nodeReactions = nodeReactions;
    this.transcription_factor = transcription_factor;
  }

  getTranscriptionFactors(){
    const _nodes = []
    const _edges = []

    const partition = this.width/(this.transcription_factor.size+1)
    let inx = 1
    this.transcription_factor.forEach((item)=>{
      const target = this.nodes[item].data.id;
      _nodes.push({...this.nodes[item], position: { x: partition*(inx), y: this.height } });
      const reactions = this.nodeReactions[item]
      const rPartition = this.width/(reactions.size+1)
      let rInx = 1
      reactions.forEach((reaction)=>{
        const source = reaction.split('-')[1]
        const {nodes} = this.getReaction(reaction);
        nodes.forEach((node)=>{
          if (node.data.type === "reaction-node") {
            _nodes.push({...node, position: {x: rPartition*(rInx), y: this.height-50} });
          }
        })
        _edges.push(this.edges["e-"+source+"-"+target])
        rInx++;
      })
      inx++;
    })
    console.log({_nodes, _edges});
    return [..._nodes,..._edges]
  }



  getReaction(reaction){
    const relation = this.relationship[reaction];
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
    return {nodes:_nodes,edges:_edges}
  }

}
