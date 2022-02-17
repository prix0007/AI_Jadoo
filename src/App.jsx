import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import { Graph, Node } from "./graph";
import { ConstructInitGraph } from "./utils";
import sha256 from 'crypto-js/sha256';

const drawLine = (ctx, x1, y1, x2, y2, color, width) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color || "black";
  ctx.lineWidth = width || 1;
  ctx.stroke();
  ctx.restore();
}

const drawCircle = (ctx, x, y, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color || "red";
  ctx.fill();
  ctx.save();
}

const drawRectangle = (ctx, x, y, w, h, color, lineWidth) => {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.strokeColor = color || "gray";
  ctx.lineWidth = lineWidth || 0.1;
  ctx.strokeStyle = "dotted";
  ctx.stroke();
  ctx.save();
}

const drawRectangleSolid = (ctx, x, y, w, h, color) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color || "gray";
  ctx.fill();
  ctx.save();
}


const drawArrow = (ctx, p1, p2, size) => {
  var angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x));
  var hyp = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));

  ctx.save();
  ctx.translate(p1.x, p1.y);
  ctx.rotate(angle);

  // line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(hyp - size, 0);
  ctx.strokeStyle = "gray";
  ctx.stroke();

  // triangle
  ctx.fillStyle = 'teal';
  ctx.beginPath();
  ctx.lineTo(hyp - size, size);
  ctx.lineTo(hyp, 0);
  ctx.lineTo(hyp - size, -size);
  ctx.fill();

  ctx.restore();
}

const MIN_X_SCALE = 60;
const MIN_Y_SCALE = 60;

function App() {

  const [graph, setGraph] = useState(new Graph());

  const [pacman, setPacman] = useState(new Node(1, 1));
  const [food, setFood] = useState(new Node(3, 2));

  const canvasRef = useRef(null);

  useEffect(() => {

    let graph = ConstructInitGraph();

    setGraph(graph);

  }, [])

  const construct_grid = () => {
    if (graph) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.fillStyle = "#ccc";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      const vertexes = graph.getVertexes();

      vertexes.forEach((node) => {
        // console.log(node.x * 10, node.y * 10);
        drawRectangle(context, node.x * MIN_X_SCALE, node.y * MIN_Y_SCALE, MIN_X_SCALE, MIN_Y_SCALE, "#e6e600");
      })

      drawCircle(context, (pacman.x * MIN_X_SCALE) + 30, (pacman.y * MIN_Y_SCALE) + 30, 20, "#ffea00")
      drawRectangleSolid(context, (food.x * MIN_X_SCALE) + 20, (food.y * MIN_Y_SCALE) + 20, 20, 20, "#E74C3C")

      const edges = graph.getEdges();

      const borderColor = "#0d47a1";
      const borderWidth = 5;

      drawLine(context, 1 * MIN_X_SCALE, 1 * MIN_Y_SCALE, 5 * MIN_X_SCALE, 1 * MIN_Y_SCALE, borderColor, borderWidth);
      drawLine(context, 1 * MIN_X_SCALE, 4 * MIN_Y_SCALE, 5 * MIN_X_SCALE, 4 * MIN_Y_SCALE, borderColor, borderWidth);
      drawLine(context, 1 * MIN_X_SCALE, 1 * MIN_Y_SCALE, 1 * MIN_X_SCALE, 4 * MIN_Y_SCALE, borderColor, borderWidth);
      drawLine(context, 5 * MIN_X_SCALE, 1 * MIN_Y_SCALE, 5 * MIN_X_SCALE, 4 * MIN_Y_SCALE, borderColor, borderWidth);

      drawLine(context, 2 * MIN_X_SCALE, 2 * MIN_Y_SCALE, 2 * MIN_X_SCALE, 3 * MIN_Y_SCALE, borderColor, borderWidth);
      drawLine(context, 2 * MIN_X_SCALE, 3 * MIN_Y_SCALE, 4 * MIN_X_SCALE, 3 * MIN_Y_SCALE, borderColor, borderWidth);
      drawLine(context, 4 * MIN_X_SCALE, 2 * MIN_Y_SCALE, 4 * MIN_X_SCALE, 3 * MIN_Y_SCALE, borderColor, borderWidth);
      drawLine(context, 4 * MIN_X_SCALE, 2 * MIN_Y_SCALE, 3 * MIN_X_SCALE, 2 * MIN_Y_SCALE, borderColor, borderWidth);

      // edges.forEach((edge) => {
      //   drawArrow(context, 
      //     new Node(
      //       (edge.nodeA.x * MIN_X_SCALE) + 30 + Math.floor(Math.random() * 10), 
      //       (edge.nodeA.y * MIN_Y_SCALE) + 30 + Math.floor(Math.random() * 10)
      //     ), 
      //     new Node(
      //       (edge.nodeB.x * MIN_X_SCALE) + 30 + Math.floor(Math.random() * 10), 
      //       (edge.nodeB.y * MIN_Y_SCALE) + 30 + Math.floor(Math.random() * 10)
      //     ), 
      //     10
      //   );
      // })
    }
  }



  const construct_graph = () => {
    if (graph) {
      construct_grid();
    } else {
      console.log("graph Not Found");
    }
  }

  useEffect(() => {
    construct_graph()
  })

  const get_current_neighbours = current_vertex => {
    
    let neighbours = new Array();

    if(graph) {
      let edges = graph.getEdges();
      for (let i = 0; i < edges.length; ++i) {
        let a = edges[i].nodeA;
        let b = edges[i].nodeB;
        if (current_vertex.x == a.x && current_vertex.y == a.y) {
          neighbours.push(b);
        }
      }
    } else {
      throw "Graph Not Found"
    }

    return neighbours.reverse();
  }

  const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  const depth_first_search = async (start, goal) => {

    // console.log(start, goal);

    let visited = new Set();
    let history = new Array();
    let fringe = new Array();

    fringe.push(start);
    visited.add(start.x.toString() + start.y.toString());


    // Shift is POP FRONT
    let current_vertex = fringe.shift();

    while(current_vertex != undefined) {
      history.push(current_vertex);

      // GUI Handle to show PACMAN Position
      setPacman(current_vertex);

      // Delay
      await sleep(2000);

      if (current_vertex.x === goal.x && current_vertex.y === goal.y) {
        return history;
      }

      let current_neighbours = get_current_neighbours(current_vertex);
      
      for (let i =0; i < current_neighbours.length;  ++i) {

        if (!visited.has(current_neighbours[i].x.toString() + current_neighbours[i].y.toString())) {

          visited.add(current_neighbours[i].x.toString() + current_neighbours[i].y.toString());

          // Unshift Does a Push Front
          fringe.unshift(current_neighbours[i]);

        }
      }

      // Shift Does a push front
      current_vertex = fringe.shift();

    }

    return null;
    
  }


  return (
    <main>
      {
        graph ? <p></p> : <p>{"Graph is Not Loaded!!!!!!!!!!!!!"}</p>
      }
      <canvas ref={canvasRef} width={500} height={300} />
      <div>
        <div>
          <p>Pacman X</p>
          <input 
            type={"number"} 
            placeholder="Pacman X" 
            onChange={(e) => setPacman(new Node(e.target.value, pacman.y))} 
          />
          <p>Pacman Y</p>
          <input 
            type={"number"} 
            placeholder="Pacman Y" 
            onChange={(e) => setPacman(new Node(pacman.x, e.target.value))} 
          />
        </div>
        <div>
          <p>Food X</p>
          <input 
            type={"number"} 
            placeholder="Food X"
            onChange={(e) => setFood(new Node(e.target.value, food.y))}
          />
          <p>Food Y</p>
          <input 
            type={"number"} 
            placeholder="Food Y" 
            onChange={(e) => setFood(new Node(food.x, e.target.value))} 
          />
        </div>
        <button onClick={() => depth_first_search(new Node(1, 1), new Node(3, 2))}>Depth First Search</button>
      </div>
    </main>
  );
}

export default App;