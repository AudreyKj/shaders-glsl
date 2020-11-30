const canvasSketch = require('canvas-sketch');
//utility that we use to get started with a fullscreen shader 
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
};

// Your glsl code
//this is our actual shader code 
//it's a template string wrapped inside glsl 

//uniform and varying paragraph: variables 
//time variable coming from JS: 
//it's the current time in seconds 
//it's a float, which is a decimal value 

//main function is where the whole pixel manipulation goes
//every shader needs to have a main function  

//ternary: 
//if the distance is greater than 0.5, let's make our alpha 1
//if the distance is less than 0.5, let's make our alpha 0
const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    vec3 colorA = vec3(1.0, 1.0, 1.0);
    vec3 colorB = vec3(0.2, 0.3, 0.4);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);

    vec3 color = mix(colorA, colorB, vUv.x);
    gl_FragColor = vec4(color, dist > 0.45 ? 0.0 : 1.0);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: "white",
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    //uniform is like a value from javaScript 
    
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspect: ({width, height}) => width / height
    }
  });
};

canvasSketch(sketch, settings);
