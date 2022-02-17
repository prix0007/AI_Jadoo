import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import { Graph } from "./graph";
import { ConstructInitGraph } from "./utils";

const drawLine = (ctx, x1, y1, x2, y2, color) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color || "black";
  ctx.stroke();
}

const drawCircle = (ctx, x, y, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color || "red";
  ctx.fill();
}

const drawRectangle = (ctx, x, y, w, h, color) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color || "gray";
  ctx.fill();
}

function App() {

  const [graph, setGraph] = useState(new Graph());
  const [isGraph, setIsGraph] = useState(false);

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
  

    }
  }

  const construct_graph = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if(graph) {
      construct_grid();
    } else {
      console.log("graph Not Found");
    }
  }

  useEffect(() => {
    construct_graph()
  })

  return (
    <main>
      {
        graph ? <p></p> : <p>{"Graph is Not Loaded!!!!!!!!!!!!!"}</p> 
      }
      <canvas ref={canvasRef} />
      Hello Where are you
    </main>
  );
}

export default App;