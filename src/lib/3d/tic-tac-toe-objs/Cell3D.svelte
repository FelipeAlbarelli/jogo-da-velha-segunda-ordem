<script lang="ts">
    import { T , useLoader } from  '@threlte/core'
	import { quadOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { BoxGeometry, ShaderMaterial, TorusGeometry, Vector2, Vector3 } from 'three';
	import { debugMsg } from '../store';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

    import fragShader from '../../../shaders/frag.glsl?raw'
    import vertexShader from '../../../shaders/vertex.glsl?raw'
    import vertexShader2 from '../../../shaders/vertex2.glsl?raw'
	import CellModel from './CellModel.svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
    export let y = 0 , z = 0;

    export let size = 9;
    export let depth  = 1;
    const pulsePosition = new Vector3()

    const pulseTimer = tweened(0.1 )

    pulseTimer.set( 100 , {
        duration : 100_000
    });


    pulseTimer.subscribe( s => {
        debugMsg.update( prev => ({...prev, pulseTimer : s}) )
    })
    const geometry = new BoxGeometry(0.5 , depth , 5 , 20 , 20 , 20)

    const geometry2 = new TorusGeometry(3 , 2 , 10 ) 

    geometry.computeVertexNormals()
    geometry2.computeVertexNormals()

    let shader : ShaderMaterial

    $: {
        if (shader) {
        shader.vertexShader = vertexShader
        } 
    } 

</script>

<T.Mesh

  position.y={y }
  position.z={ z  }
  rotation.x={ 0 }
  rotation.y={ 0 }
  rotation.z={ 90 * DEG2RAD }
>
  <CellModel
    size={2}
  >
  </CellModel>
</T.Mesh>

<!-- Shader -->
<!-- <T.Mesh
    position.y={y }
    position.z={ z  }
    geometry={geometry}
>

  <T.ShaderMaterial
    
    bind:ref={shader}

    uniforms={{
      pulseTimer: {
        value: 0
      },
      pulsePosition: {
        value: pulsePosition
      }
    }}
    uniforms.pulseTimer.value={$pulseTimer  ?? 0 }
    vertextShader={vertexShader}
    fragmentShader={fragShader}
  />
</T.Mesh> -->