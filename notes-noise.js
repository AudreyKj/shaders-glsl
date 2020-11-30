/*

GLSL NOISE 
glsl-noise

module that we install and we require in our glsl code 

it's a noise function that uses 2d, 3d, or 4d noise 
it's still GLSL but it's install on npm, which kinda of a hack 

noise function, we're giving it 3 coordinates because it's a 3D noise function 
float n = noise(vec3(vUv.xy, time));

really cool noise: 

const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');

  void main () {

    float n = noise(vec3(vUv.xy, time));

    gl_FragColor = vec4(vec3(n), 1.0);
  }
`);

variation: 
smaller particules 
float n = noise(vec3(vUv.xy * 5.0, time));

add some color: 
#pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

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
    // float dist = length(center);

    // float alpha = smoothstep(0.75 + sin(time), 0.5, dist);

    // vec3 color = mix(colorA, colorB, vUv.y + vUv.x * sin(time));
    // gl_FragColor = vec4(color, alpha);

    float n = noise(vec3(vUv.xy * 2.0, time));

    vec3 color = hsl2rgb(0.5, 0.5, 0.5);

    gl_FragColor = vec4(color, 1.0);
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

noise values goes from -1 to 1

//looks like kinda of covid shader 
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
    // float dist = length(center);

    // float alpha = smoothstep(0.75 + sin(time), 0.5, dist);

    // vec3 color = mix(colorA, colorB, vUv.y + vUv.x * sin(time));
    // gl_FragColor = vec4(color, alpha);

    float n = noise(vec3(vUv.xy * 2.0, time));

    vec3 color = hsl2rgb((0.2 + n * 0.2), 0.5, 0.5);

    gl_FragColor = vec4(color, 0.5);
  }
`);

//the bigger you multiply, the more colors it has, like psycchedilic 
//the more smaller it is, it's going to be more one hue 
vec3 color = hsl2rgb((0.2 + n * 0.2), 0.5, 0.5);

//shader noise that looks like COVID 
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

    float alpha = smoothstep(0.25, 0.235, dist);

    // vec3 color = mix(colorA, colorB, vUv.y + vUv.x * sin(time));
    // gl_FragColor = vec4(color, alpha);

    float n = noise(vec3(vUv.xy * 1.0, time));

    vec3 color = hsl2rgb((0.1 + n * 0.2), 0.3, 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`);















*/