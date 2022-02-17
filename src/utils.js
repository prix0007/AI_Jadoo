import {Graph, Node} from "./graph";

const ConstructInitGraph = () => {
  let graph = new Graph();


  // Add vertex is x, y
  graph.addVertex(1, 1);
  graph.addVertex(2, 1);
  graph.addVertex(3, 1);
  graph.addVertex(1, 2);
  graph.addVertex(2, 2);
  graph.addVertex(3, 2);
  graph.addVertex(1, 3);
  graph.addVertex(2, 3);
  graph.addVertex(3, 3);
  graph.addVertex(1, 4);
  graph.addVertex(2, 4);
  graph.addVertex(3, 4);
  
  // Add Edge is as Follow
  // Node1, Node2, Weight

  // // // // // // // // 
  graph.addEdge(new Node(1, 1), new Node(1, 2), 1);
  graph.addEdge(new Node(1, 1), new Node(2, 1), 1);
  graph.addEdge(new Node(1, 2), new Node(1, 1), 1);
  graph.addEdge(new Node(1, 2), new Node(1, 3), 1);
  graph.addEdge(new Node(1, 3), new Node(1, 2), 1);
  graph.addEdge(new Node(1, 3), new Node(2, 3), 1);
  graph.addEdge(new Node(2, 1), new Node(1, 1), 1);
  graph.addEdge(new Node(2, 1), new Node(2, 2), 1);
  graph.addEdge(new Node(2, 1), new Node(3, 1), 1);
  graph.addEdge(new Node(2, 2), new Node(2, 1), 1);
  graph.addEdge(new Node(2, 2), new Node(3, 2), 1);
  graph.addEdge(new Node(2, 3), new Node(1, 3), 1);
  graph.addEdge(new Node(2, 3), new Node(3, 3), 1);
  graph.addEdge(new Node(3, 1), new Node(2, 1), 1);
  graph.addEdge(new Node(3, 1), new Node(4, 1), 1);
  graph.addEdge(new Node(3, 2), new Node(2, 2), 1);
  graph.addEdge(new Node(3, 3), new Node(2, 3), 1);
  graph.addEdge(new Node(3, 3), new Node(4, 3), 1);
  graph.addEdge(new Node(4, 1), new Node(3, 1), 1);
  graph.addEdge(new Node(4, 1), new Node(4, 2), 1);
  graph.addEdge(new Node(4, 2), new Node(4, 1), 1);
  graph.addEdge(new Node(4, 2), new Node(4, 3), 1);
  graph.addEdge(new Node(4, 3), new Node(4, 2), 1);
  graph.addEdge(new Node(4, 3), new Node(3, 3), 1);
  
  return graph
}

export {
  ConstructInitGraph
}