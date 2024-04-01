<script lang="ts">
    import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
    import { T, useTask, useThrelte } from '@threlte/core'
    import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier'
    import { onDestroy, onMount } from 'svelte'
    import { PerspectiveCamera, Raycaster, Vector2, Vector3 } from 'three'
  import OtherCameraControl from './OtherCameraControl.svelte';
	import Ground from './Ground.svelte';
	import { debugMsg } from './store';

    export let position = [4, 1, 0]
    export let createGround = true
    let radius = 0.3
    let height = 1.7
    export let speed = 6

    export let positionFixed = false;
  
    let rigidBody: RapierRigidBody
    let lock: () => void
    let cam: PerspectiveCamera

    let forward = 0
    let backward = 0
    let left = 0
    let right = 0
  
    const t = new Vector3()
  
    const lockControls = () => lock()
  
    const { renderer } = useThrelte()
  
    renderer.domElement.addEventListener('click', lockControls)
  
    onDestroy(() => {
      renderer.domElement.removeEventListener('click', lockControls)
    })
  
    onMount( () => {

    })

    useTask(() => {
      if (!rigidBody || positionFixed) return
      // get direction
      const velVec = t.fromArray([right - left, 0, backward - forward])
      // sort rotate and multiply by speed
      velVec.applyEuler(cam.rotation).multiplyScalar(speed)
      // don't override falling velocity
      const linVel = rigidBody.linvel()
      t.y = linVel.y
      // finally set the velocities and wake up the body
      rigidBody.setLinvel(t, true)
  
      // when body position changes update position prop for camera
      const pos = rigidBody.translation()
      position = [pos.x, pos.y, pos.z]

        debugMsg.update( prev => ({...prev , 
            'posX' : pos.x,
            'posY' : pos.y,
        }))

    })
  
    function onKeyDown(e: KeyboardEvent) {

      switch (e.key) {
        case 's':
          backward = 1
          break
        case 'w':
          forward = 1
          break
        case 'a':
          left = 1
          break
        case 'd':
          right = 1
          break
        default:
          break
      }
    }
  
    function onKeyUp(e: KeyboardEvent) {
      switch (e.key) {
        case 's':
          backward = 0
          break
        case 'w':
          forward = 0
          break
        case 'a':
          left = 0
          break
        case 'd':
          right = 0
          break
        default:
            console.log(e.key)
          break
      }
    }

  </script>
  
  <svelte:window
    on:keydown|preventDefault={onKeyDown}
    on:keyup={onKeyUp}
  />
  
  <T.Group 
  on:pointermove={(e) => console.log('move')}
  position.y={0.9}>
    <T.PerspectiveCamera
      makeDefault
      fov={50}
      bind:ref={cam}
      position.x={position[0]}
      position.y={position[1]}
      position.z={position[2]}
      on:create={({ ref }) => {
        ref.lookAt(new Vector3(0, 1, 0))
      }}
    >
      <OtherCameraControl bind:lock />
    </T.PerspectiveCamera>
  </T.Group>
  
  <T.Group {position}>
    <RigidBody
      bind:rigidBody
      enabledRotations={[false, false, false]}
    >
      <CollisionGroups groups={[0]}>
        <Collider
          shape={'capsule'}
          args={[height / 2 - radius, radius]}
        />
      </CollisionGroups>
  
      <!-- <CollisionGroups groups={[15]}>
        <T.Group position={[0, -height / 2 + radius, 0]}>
          <Collider
            sensor
            shape={'ball'}
            args={[radius * 1.2]}
          />
        </T.Group>
      </CollisionGroups> -->
    </RigidBody>
  </T.Group>
  

  {#if createGround }

  <Ground 
    invisible={true}
    dim={[100, 100]}
  />

    
  {/if}