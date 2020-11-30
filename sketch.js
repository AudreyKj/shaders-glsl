//we're using this js library 
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

//encapsulate artwork within a single function 
//it's a function that returns another function 
//it's like a render function in react that accepts props coming in 
//here context, width, height are like the props 
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
