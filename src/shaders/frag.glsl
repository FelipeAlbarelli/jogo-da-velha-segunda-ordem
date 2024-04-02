#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;// Canvas size (width,height)
uniform vec2 u_mouse;// mouse position in screen pixels
uniform float pulseTimer;// Time in seconds since load
// uniform float cameraPosition;// Time in seconds since load

varying vec2 vUv;

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
    float f1=abs(sin(cameraPosition.x));
    float uvSum=abs(((vUv.x+vUv.y-.5)*.5));
    
    vec2 uvTransf=vec2(
        abs(.5-vUv.x),
        abs(.5-vUv.y)
    );
    
    float uvTransfSum=(uvTransf.x+uvTransf.y)*.5;
    float uvTransfGeo=sqrt(uvTransf.x*uvTransf.y);
    
    float verticalUv=vUv.y;
    float horlUv=pow(abs(.5-vUv.x)*2.,2.);
    float horlUv2=smoothstep(0.,1.,uvTransf.x);
    float distBased=smoothstep(0.,1.,
        distance(vUv,vec2(.5,.5))
    );
    
    gl_FragColor=vec4(
        parabola(vUv.x,1.)+parabola(vUv.y,1.),
        .0,
        .0,
    1.);
}

