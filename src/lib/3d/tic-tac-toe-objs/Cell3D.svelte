<script lang="ts">
    import { T  } from  '@threlte/core'
    export let y = 0 , z = 0;

    export let size = 9;
</script>


<T.Mesh
    position.y={y }
    position.z={ z  }
>
  <T.MeshStandardMaterial  />
  <T.BoxGeometry args={[0.5, size, size]} />
  <!-- <T.ShaderMaterial
  /> -->
</T.Mesh>