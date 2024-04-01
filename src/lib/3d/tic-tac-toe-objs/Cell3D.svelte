<script lang="ts">
    import { T  } from  '@threlte/core'
	import { Vector2, Vector3 } from 'three';
    export let y = 0 , z = 0;

    export let size = 9;
  const pulsePosition = new Vector3()
  let vertexShader = `
        void main() {
            gl_FragColor = vec4(1.0,0.0,1.0,1.0);
        }
  `
    const frag = ` 
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform float u_time;

        void main() {
            gl_FragColor = vec4(1.0, 1, 1.0, 1.0);
        }

     `

</script>


<T.Mesh
    position.y={y }
    position.z={ z  }
>
  <T.MeshStandardMaterial  />
  <T.BoxGeometry args={[0.5, size, size]} />
  <T.ShaderMaterial
    uniforms={{
      pulseTimer: {
        value: 0
      },
      pulsePosition: {
        value: pulsePosition
      }
    }}
    fragmentShader={frag}
  />
</T.Mesh>