<script lang="ts">
    import { createEventDispatcher, onDestroy } from 'svelte'
    import { Euler, Camera, Vector2 } from 'three'
    import { useThrelte, useParent } from '@threlte/core'
  import { mouseMoveStore, sceneStore, setMouseLock } from './store';
  import { spring } from 'svelte/motion';
  
    // Set to constrain the pitch of the camera
    // Range is 0 to Math.PI radians
    export let minPolarAngle = 0 // radians
    export let maxPolarAngle = Math.PI   // radians
    export let pointerSpeed = 1.0
  
    let isLocked = false
  
    const { renderer, invalidate } = useThrelte()
  
    const domElement = renderer.domElement
    const camera = useParent()
    const dispatch = createEventDispatcher()
  
    const _euler = new Euler(0, 0, 0, 'YXZ')
    const _PI_2 = Math.PI / 2
  
    if (!renderer) {
      throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?')
    }
  
    const isCamera = (p: any): p is Camera => {
      return p.isCamera
    }
  
    if (!isCamera($camera)) {
      throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
    }
  
    const onChange = () => {
      invalidate()
      dispatch('change')
    }
  
    export const lock = () => {
        domElement.requestPointerLock()
        setMouseLock(true)
        return;

    }  
    export const unlock = () =>{ 
        document.exitPointerLock()
        setMouseLock(false)
    }
    domElement.addEventListener('mousemove', onMouseMove)
    domElement.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange)
    domElement.ownerDocument.addEventListener('pointerlockerror', onPointerlockError)
  
    onDestroy(() => {
        setMouseLock(false)
      domElement.removeEventListener('mousemove', onMouseMove)
      domElement.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange)
      domElement.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError)
    })

    let mousePos = new Vector2()

    const eulerX = spring(0)
    const eulerY = spring(0)

    $: eulerXY = [$eulerX , $eulerY]
    $: {
        _euler.y -= eulerXY[1] * 0.002
        _euler.x -= eulerXY[0] * 0.002
        sceneStore.update( prev => ({
            ...prev,
            euler: new Vector2($eulerX , $eulerY)
        }))
        if ($camera) {
            $camera.quaternion.setFromEuler(_euler)
  
            onChange()
        }

    //   _euler.y = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.y))
  
    //   _euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x))
  

    }
  
    function onMouseMove(event: MouseEvent) {
      if (!isLocked) return
      if (!$camera) return
  
      const { movementX, movementY } = event
  
      _euler.setFromQuaternion($camera.quaternion)

      eulerX.set(movementY * pointerSpeed)
      eulerY.set(movementX * pointerSpeed)

      mouseMoveStore.set(event)
  
    //   _euler.y -= $eulerY * 0.002
    //   _euler.x -= $eulerX * 0.002
    //     sceneStore.update( prev => ({
    //         ...prev,
    //         euler: new Vector2($eulerX , $eulerY)
    //     }))

    // //   _euler.y = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.y))
  
    // //   _euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x))
  
    //   $camera.quaternion.setFromEuler(_euler)
  
    //   onChange()
    }
  
    function onPointerlockChange() {
      if (document.pointerLockElement === domElement) {
        dispatch('lock')
        setMouseLock(true)

        isLocked = true
      } else {
        setMouseLock(false)

        dispatch('unlock')
        isLocked = false
      }
    }
  
    function onPointerlockError() {
      console.error('PointerLockControls: Unable to use Pointer Lock API')
    }
</script>
  