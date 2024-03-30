<script>
	import { T, useTask } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import { spring } from 'svelte/motion'

  	import CameraCtr from './CameraCtr.svelte';

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
  

  
  <T.DirectionalLight
	position={[0, 10, 10]}
	castShadow
  />

  <CameraCtr />
  
  <T.Mesh
	rotation.y={rotation}
	position.y={1}
	scale={$scale}
	on:pointerenter={() => scale.set(1.5)}
	on:pointerleave={() => scale.set(1)}
	castShadow
  >
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
  </T.Mesh>
  
  <T.Mesh
	rotation.x={-Math.PI / 2}
	receiveShadow
  >
	<T.CircleGeometry args={[20, 40]} />
	<T.MeshStandardMaterial color="white" />
  </T.Mesh>
  