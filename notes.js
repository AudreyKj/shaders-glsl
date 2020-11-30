/*

NOTES FROM frontend masters course, Creative Coding with Canvas & WebGL 

CANVAS-SKETCH 
canvas-sketch is a loose collection of tools, modules and resources for 
creating generative art in JavaScript and the browser using the <canvas> tag.
It is designed to help create artworks and images with code, randomness, 
algorithms, and emergent systems.

install globally: 
npm install canvas-sketch-cli --global 

create new file 
canvas-sketch sketch.js --new 
--> this scaffolds a new file, like a js template 
---> + creates also a package.json 

canvas-sketch sketch.js --open

server runs on your local IP 
localhost:9966

create new file for shader 
canvas-sketch shader.js --new --template=shader

use flag --hot to get all the changes 
updating instantly into your scene 


SHADERS 

- a shader is a little program that is meant to do a single task using GLSL 

- GLSL is a shader language for webGL / openGL and it has a different syntax, 
it's a bit more like C rather than JavaScript 

- the main goal of the shader is to describe what the pixel color is 

Structure: 
- floating point precision: always the same 
"precision highp float"

- inputs: usually numbers, coming from webGL, called "varrying"  
you have to precise the type of the variable, a bit like C / Java 
for ex. vec2  is a type that means 2D vector or coordinate 
there is also vec3 and vec4 

varying => a value or a number coming from webGL 
called varying because a the value is not the same

uniform => called uniform because the value is the same 

- variables from JavaScript 

- main function 

- output color: gl_FragColor 

webgL sometimes uses a different coordinate system, where the y axis 
is flipped, sort of upside down 

- you have to put a number with a decimal point to gl_FragColor 

- we use vec4 with FragColor because vec4 is a RGBA value 

here we're using a 4 components vector
red / green / blue / alpha (=opacity of the canvas)
generally, we use aplpha of 1

create red: gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

gradient: 
vUv points to a vec2
vec2 means it has an x and y coordinates 
vec3 means it has an x, y, z coordinates 
vec4 means it has x, y, z, w 

so if you do vUv.x or vUv.y, you end up with a gradient image 

//with this, you get gradient with darker centre, kinda like radial 
const frag = glsl(`
  precision highp float;

  uniform float time;
  varying vec2 vUv;

  void main () {
    vec3 colorA = vec3(1.0, 1.0, 1.0);
    vec3 colorB = vec3(0.2, 0.3, 0.4);

    vec2 center = vUv - 0.5;
    float dist = length(center);

    vec3 color = mix(colorA, colorB, vUv.x);
    gl_FragColor = vec4(color, dist);
  }
`);

//ellispe with shader / background black 
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

//set clearColor: "transparent", 
to set to transparent bckgd if you want to donwload as PNG 

//white background 
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

float alpha = 1;
--> all the pixels in the image are full transparency 

step: --> really useful when writing shaders 
if the first argument is less than the second argument 
return 0, otherwise return 1
float alpha = step(dist, 0.25);

//really cool: gradient backd, white centered radial circle 
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

    float alpha = smoothstep(0.25, 0.5, dist);

    vec3 color = mix(colorA, colorB, vUv.x);
    gl_FragColor = vec4(color, alpha);
  }
`);

if you want a crisp edge: 
float alpha = smoothstep(0.255, 0.25, dist);

cool animation 
vec3 colorA = sin(time) + vec3(1.0, 1.0, 1.0);

really cool!!!
const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    vec3 colorA = sin(time) + vec3(1.0, 1.0, 1.0);
    vec3 colorB = vec3(0.2, 0.3, 0.4);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);

    float alpha = smoothstep(0.25, 0.5, dist);

    vec3 color = mix(colorA, colorB, vUv.y + vUv.x * sin(time));
    gl_FragColor = vec4(color, alpha);
  }
`);

variation:  smoothstep(0.75, 0.5, dist);
   float alpha = smoothstep(0.75 + sin(time), 0.5, dist);

   try adding sin(time) for variation 

using shaders with threejs: 
- in threejs, you can specify your own shader string 

you can slow down the animation by multiplying time by a low number 
// or bulk it by multiplying it by some high number 

































*/