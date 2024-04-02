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
    
vec2 st = gl_FragCoord.xy/u_resolution;
        vec2 vUv = st;
    float uvSum=abs(((vUv.x+vUv.y-.5)*.5));
    vec2 uvTransf=vec2(
        abs(.5-vUv.x),
        abs(.5-vUv.y)
    );
    
    float sinedTime =  (abs(sin(u_time* 1.5)) * 0.3 ) + 0.7 ;
    
    float trueSinnedTime = abs(sin(u_time));
    float stx = abs(sin(u_time * 4.5) );
    float sty = abs(cos(u_time * 0.5 ))* 0.5;

    
    float x2 = 0.2 + expStep( vUv.x, 10.0 , 1.0);
    float y2 = 0.2 + expStep( vUv.y, 10.0 , 1.0);

    float removeY = pow(uvTransf.y , 5.0);   
    float removeX = pow(uvTransf.x , 5.0); 

    gl_FragColor=vec4(
        (parabola(vUv.x, stx)*parabola(vUv.y,stx) 
         // * ( 0.5 + sty)
        ) 
        - ((removeY) * 1.0 * removeX),
        .1,
        .1,
    1.);
}

