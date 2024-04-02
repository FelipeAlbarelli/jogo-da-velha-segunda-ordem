#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;// Canvas size (width,height)
uniform vec2 u_mouse;// mouse position in screen pixels
uniform float pulseTimer;// Time in seconds since load
uniform float u_time;
varying vec3 vPosition;

float expStep(float x,float k,float n){
    return exp(-k*pow(x,n));
}
float parabola(float x,float k){
    return pow(4.*x*(1.-x),k);
}
float cubicPulse(float c,float w,float x){
    x=abs(x-c);
    if(x>w)return 0.;
    x/=w;
    return 1.-x*x*(3.-2.*x);
}

void main(){
    
    vec2 st=gl_FragCoord.xy/u_resolution;
    vec2 vUv=st;
    float uvSum=abs(((vUv.x+vUv.y-.5)*.5));
    
    float sinedTime=(abs(sin(u_time*1.5))*.3)+.7;
    
    gl_FragColor=vec4(
        parabola(vUv.x,1.)*parabola(vUv.y,1.)*(sinedTime),
        .1,
        .1,
    1.);
}

