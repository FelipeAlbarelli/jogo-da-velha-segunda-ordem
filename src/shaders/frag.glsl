#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;// Canvas size (width,height)
uniform vec2 u_mouse;// mouse position in screen pixels
uniform float pulseTimer;// Time in seconds since load

varying vec2 vUv;

varying vec3 vPosition;

void main(){
    gl_FragColor=vec4(
    vUv.x,vUv.y,1,1.);
}

