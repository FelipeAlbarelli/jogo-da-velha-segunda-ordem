<script lang="ts" >
	import { T, useTask } from '@threlte/core'
	import { Gizmo, Grid, interactivity } from '@threlte/extras'
	import { spring } from 'svelte/motion'

  import Player from './Player.svelte';
	import ThreeDimBoard from './ThreeDimBoard.svelte';
	
	interactivity()
	
	const scale = spring(1)
	const rotationSpeed = spring(1)

	let interval = setInterval( ( ) => {
		rotationSpeed.update( (v) => v == 1 ? 2 : 1)
	} , 5000)

	let rotation = 0
	useTask((delta) => {
	  rotation += delta * $rotationSpeed
	});


  </script>
  
<!-- <Grid
	position.y={0}
    type="grid"
    cellColor={'white'}
    cellThickness={2}
    gridSize={[25,25]}
>


</Grid> -->
  
  <T.DirectionalLight
	position={[20, 20, 20]}
	castShadow
  />

  <Player
	positionFixed={false}
  ></Player>

    <Gizmo

    />

<T.Mesh
	position={[0,0,0]}
>
	<ThreeDimBoard />
</T.Mesh>


	  <!-- <T.Mesh
		rotation.y={rotation}
		position.y={1}
		scale={$scale}
		on:pointerenter={() => scale.set(1.5)}
		on:pointerleave={() => scale.set(1)}
		castShadow
	  >
	  <Collider
	  shape={'cuboid'}
	  args={[1, 1, 1]}
	  />
		<T.BoxGeometry args={[1, 2, 1]} />
		<T.MeshStandardMaterial color="hotpink" />
	  </T.Mesh> -->
  
  <!-- <T.Mesh
	rotation.x={-Math.PI / 2}
  >
	<T.CircleGeometry args={[20, 40]} />
	<T.MeshStandardMaterial transparent opacity="0.1" color="white" />
  </T.Mesh>
   -->