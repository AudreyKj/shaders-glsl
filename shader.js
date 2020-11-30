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

//hsl stands for hue saturation lightness 
const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

  void main () {
    // vec3 colorA = sin(time) + vec3(1.0, 1.0, 1.0);
    // vec3 colorB = vec3(0.2, 0.3, 0.4);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);

    float alpha = smoothstep(0.45, 0.4, dist);

    // vec3 color = mix(colorA, colorB, vUv.y + vUv.x * sin(time));
    // gl_FragColor = vec4(color, alpha);

    float n = noise(vec3(vUv.xy * 5.0, time));

    vec3 color = hsl2rgb((0.1 + n * 0.2), 0.3, 0.5);

    gl_FragColor = vec4(color, alpha);
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


// /**
//  * An attempt to recreate the effect by DIA Studio Primary project
//  * as a GLSL shader.
//  *
//  * https://www.behance.net/gallery/33134879/Primary
//  */

// const canvasSketch = require('canvas-sketch');
// const createShader = require('canvas-sketch-util/shader');
// const glsl = require('glslify');

// // Setup our sketch
// const settings = {
//   context: 'webgl',
//   dimensions: [ 1024, 1024 ],
//   animate: true
// };

// // Your glsl code
// const frag = glsl(/* glsl */`
//   precision highp float;
//   #pragma glslify: noise = require('glsl-noise/simplex/3d');
//   #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
//   uniform float time;
//   uniform float aspect;
//   varying vec2 vUv;
//   float circle (vec2 point) {
//     vec2 pos = vUv - point;
//     pos.x *= aspect;
//     return length(pos);
//   }
//   void main () {
//     float distFromCenter = circle(vec2(0.5));
//     float mask = smoothstep(0.25, 0.2475, distFromCenter);
//     vec2 q = vUv;
//     q.x *= aspect;
//     float d = 0.0;
//     d += (noise(vec3(q * 1.0, time * 0.5)) * 0.5 + 0.5) * 0.5;
//     d += (noise(vec3(q * 0.25 + 0.5, time * 0.25)) * 0.5 + 0.5) * 0.5;
//     d = clamp(d, 0.0, 1.0);
//     vec3 color = hsl2rgb(
//       mod(time * 0.05, 1.0) + (0.5 + d * 0.5),
//       0.5,
//       0.5 + d * 0.25
//     );
//     vec3 fragColor = color;
//     gl_FragColor = vec4(fragColor, mask);
//   }
// `);

// // Your sketch, which simply returns the shader
// const sketch = async ({ gl }) => {
//   // Create the shader and return it
//   return createShader({
//     clearColor: 'hsl(0, 0%, 95%)',
//     // Pass along WebGL context
//     gl,
//     // Specify fragment and/or vertex shader strings
//     frag,
//     // Specify additional uniforms to pass down to the shaders
//     uniforms: {
//       // Expose props from canvas-sketch
//       time: ({ time }) => time,
//       aspect: ({ width, height }) => width / height
//     }
//   });
// };

// canvasSketch(sketch, settings);
