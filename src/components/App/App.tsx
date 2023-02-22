import {
  AccumulativeShadows,
  Center,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import {
  Vignette,
  Noise,
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { FC, Suspense } from "react";
import Blob from "../Blob";

// 'normalMap-repeat': [40, 40],
// normalScale: [0.05, 0.05]

const App: FC = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
      {/* <directionalLight /> */}
      <Blob />
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={3}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 2, 1]}
          />
          <Lightformer
            type="ring"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-0.1, -1, -5]}
            scale={10}
          />
        </group>
      </Environment>
      <OrbitControls />
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.4} height={300} />
        <Noise opacity={1} />
      </EffectComposer>
    </Canvas>
  );
};

export default App;
