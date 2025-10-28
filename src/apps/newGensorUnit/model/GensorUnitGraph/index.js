import processNodesAndEdges from "./processNodesAndEdges";

export default class GensorUnitGraph {
    nodes = [];
    edges = [];

    constructor(guData){
        const {edges, nodes} = processNodesAndEdges(guData?.reactions);
        this.nodes = nodes;
        this.edges = edges;
    }




    showGraph(){
        console.log("nodes: ",this.nodes)
        console.log("edges: ",this.edges)
    }
}