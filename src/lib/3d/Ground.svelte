<script lang="ts">
    import { T } from '@threlte/core'
    import { AutoColliders } from '@threlte/rapier'
    import { BoxGeometry, MeshStandardMaterial } from 'three'

  export let invisible = false;
  export let dim = [10 , 10]

  </script>
  
  <T.Group position={[0, -0.5, 0]}>

    <AutoColliders shape={'cuboid'}>

    <T.Mesh
      visible={!invisible}
    >
      <T.MeshStandardMaterial 
        color="blue" 
        />
      <T.BoxGeometry args={[dim[0], 1, dim[0]]} />
    </T.Mesh>

    </AutoColliders>
  </T.Group>
  