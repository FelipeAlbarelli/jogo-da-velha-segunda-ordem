varying vec2 vUv;
varying vec3 vPosition;
uniform float pulseTimer;// Time in seconds since load

mat4 translate(vec3 d)
{
    return mat4(1,0,0,d.x,
        0,1,0,d.y,
        0,0,1,d.z,
    0,0,0,1);
}

mat4 scale(float c)
{
    return mat4(c,0,0,0,
        0,c,0,0,
        0,0,c,0,
    0,0,0,1);
}

mat4 rotate2d(float a)
{
    return mat4(cos(a),-sin(a),0,0,
    sin(a),cos(a),0,0,
    0,0,1.,0,
0,0,0,1.);
}

mat4 ortho(float n,float f,float r,float l,float t,float b)
{
return mat4(2./(r-l),0,0,-(r+l)/(r-l),
0,2./(t-b),0,-(t+b)/(t-b),
0,0,-2./(f-n),-(f+n)/(f-n),
0,0,0,1);

}

mat4 orthoX(vec2 pos,float aspect,float w)
{
return ortho(-1.,1.,w/2.,-w/2.,w*aspect/2.,-w*aspect/2.)*translate(vec3(pos,0));
}

void main(){
vPosition=(modelMatrix*vec4(position,1.)).xyz;

float timeSin=1.+(sin(pulseTimer*5.)*.1);
float timeMod=((mod(pulseTimer,2.))*.1)+.5;

float superficieVar=(1.-uv.x)+(1.-uv.y);

vec4 modelPosition=modelMatrix*vec4(position,1);
float timeCos=1.+(cos(pulseTimer)*.5);

vec4 newModelPos=modelPosition;

vec4 viewPosition=viewMatrix*newModelPos;
vec4 projectedPosition=projectionMatrix*viewPosition;

// gl_Position=projectedPosition
gl_Position=vec4(projectedPosition.x,projectedPosition.yzw);
vUv=uv;
}