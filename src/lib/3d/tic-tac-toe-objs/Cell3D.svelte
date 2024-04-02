<script lang="ts">
    import { T  } from  '@threlte/core'
	import { quadOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { Vector2, Vector3 } from 'three';
	import { debugMsg } from '../store';

    import fragShader from '../../../shaders/frag.glsl?raw'
    export let y = 0 , z = 0;

    export let size = 9;
  const pulsePosition = new Vector3()

      const pulseTimer = tweened(0.1 )

    pulseTimer.set( 100 , {
        duration : 100_000
    });


    pulseTimer.subscribe( s => {
        debugMsg.update( prev => ({...prev, pulseTimer : s}) )
    })
  let vertexShader = `
        void main() {
            gl_FragColor = vec4(1.0,0.0,1.0,1.0);
        }
  `
    const frag = ` 
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform vec2 u_resolution;  // Canvas size (width,height)
        uniform vec2 u_mouse;       // mouse position in screen pixels
        uniform float pulseTimer;       // Time in seconds since load

        void main() {
            gl_FragColor = vec4(abs(sin(pulseTimer)),0.0,0.0,1.0);
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
    uniforms.pulseTimer.value={$pulseTimer  ?? 0 }
    fragmentShader={fragShader}
  />
</T.Mesh>