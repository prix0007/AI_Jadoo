
class Node {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  getNodeCoords() {
    return {x: this.x, y: this.y};
  }
}

class Edge {
  constructor (nodeA, nodeB, weight) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.weight = weight;
  }

  getEdge() {
    return {
      a: this.nodeA,
      b: this.nodeB,
      w: this.weight
    }
  }


}

class Graph {
  constructor() {
    this.nodes = new Array();
    this.edges = new Array();
  };

  addVertex(x, y) {
    this.nodes.push(new Node(x, y));
  }

  addEdge(nodeA, nodeB, weight) {
    this.edges.push(new Edge(nodeA, nodeB, weight));
  }

  getVertexes() {
    return this.nodes;
  }

  getEdges() {
    return this.edges;
  }

  getNumberOfVertext() {
    return this.nodes.length;
  }

  getNumberOfEdges() {
    return this.edges.length
  }

  findEdgePair(nodeA, nodeB) {
    this.edges.forEach((edge) => {
      let a = edge.nodeA;
      let b = edge.nodeB;
      if (a.x === nodeA.x && a.y === nodeA.y && b.x === nodeB.x && b.y === nodeB.y) {
        return edge.weight;
      }
    })
    return -1;
  }

}


export {
  Graph,
  Node, 
  Edge
}