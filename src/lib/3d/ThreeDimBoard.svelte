<script lang="ts" >
	import { T, useTask, useThrelte } from '@threlte/core'
	import {  Grid } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { debugMsg, mouseMoveStore, setVectorToDebug } from './store';
	import { Raycaster, Vector2, Vector3, type Intersection, Object3D, type Object3DEventMap, Mesh } from 'three';

    const scale = spring(1)
    const { renderer, camera , scene} = useThrelte()

    const camDire = new Vector3()
    const otherDir = new Vector3()
    const raycaster = new Raycaster();

    const pointer = new Vector2(0,0)


    let thisMesh : Mesh


    let intersects : Intersection<Object3D<Object3DEventMap>>[] = []


    useTask( (delta) => {
        for ( let i = 0; i < intersects.length; i ++ ) {
            const obj = intersects[ i ].object
            obj.rotateY(delta)
            
        }
    })


    mouseMoveStore.subscribe( event => {
        if (!thisMesh) return

        $camera.getWorldDirection(camDire)

        raycaster.setFromCamera( pointer, $camera );

        intersects = raycaster.intersectObjects(thisMesh.children );

        // for ( let i = 0; i < intersects.length; i ++ ) {

        //     intersects[ i ].object.rotateZ()
            
        //     material.color.set( 0xff0000 );

        // }

        // setVectorToDebug( 'camDire' , camDire)
        // console.log(e)
    })
    
</script>


<Grid
	position.x={-20}
	position.y={0}
    position.z={0}
    plane="zy"
    type="grid"
    cellColor={'white'}
    cellThickness={1}
    sectionSize={3}
    gridSize={[27,27]}
>


</Grid>
<T.Mesh
    bind:ref={thisMesh}
  position={[0,4,0]}
>
  <T.MeshStandardMaterial color="blue" />
  <T.BoxGeometry args={[1, 2, 1]} />
</T.Mesh>


<T.Mesh
    interactive
	scale={$scale}
	castShadow
    on:click={() => console.log('click')}

>
	<T.BoxGeometry
     args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh>