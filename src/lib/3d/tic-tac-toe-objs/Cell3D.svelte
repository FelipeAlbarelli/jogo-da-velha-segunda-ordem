<script lang="ts">
    import { T  } from  '@threlte/core'
	import { quadOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { BoxGeometry, ShaderMaterial, TorusGeometry, Vector2, Vector3 } from 'three';
	import { debugMsg } from '../store';

    import fragShader from '../../../shaders/frag.glsl?raw'
    import vertexShader from '../../../shaders/vertex.glsl?raw'
    import vertexShader2 from '../../../shaders/vertex2.glsl?raw'
	import TabsNavBar from '../../../navigation/TabsNavBar.svelte';
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
    const geometry = new BoxGeometry(0.5 , 5 , 5 , 20 , 20 , 20) 
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
</T.Mesh>