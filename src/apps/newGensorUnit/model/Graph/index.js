export default class Graph {
  constructor(isDirected = false) {
    this.adjList = new Map();
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, new Set());
    }
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjList.get(v1).add(v2);

    if (!this.isDirected) {
      this.adjList.get(v2).add(v1);
    }
  }

  removeEdge(v1, v2) {
    this.adjList.get(v1)?.delete(v2);
    if (!this.isDirected) {
      this.adjList.get(v2)?.delete(v1);
    }
  }

  removeVertex(v) {
    this.adjList.delete(v);
    for (const [key, neighbors] of this.adjList) {
      neighbors.delete(v);
    }
  }

  getNeighbors(v) {
    return this.adjList.get(v);
  }

  print() {
    for (const [v, neighbors] of this.adjList) {
      console.log(`${v} → ${[...neighbors].join(", ")}`);
    }
  }
}
