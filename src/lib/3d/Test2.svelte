<script>
  import { T, Canvas } from '@threlte/core'
  import { RoundedBoxGeometry } from '@threlte/extras'
</script>

<Canvas>
  <T.PerspectiveCamera
    makeDefault
    position={[3, 3, 3]}
    lookAt={[0, 0, 0]}
  />

  <T.Mesh>
    <RoundedBoxGeometry />
    <T.MeshPhongMaterial color="hotpink" />
  </T.Mesh>
</Canvas>
