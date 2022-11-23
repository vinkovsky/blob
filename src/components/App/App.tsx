import {
  AccumulativeShadows,
  Center,
  Environment,
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
      <Suspense fallback={null}>
        <Blob />
        <Environment preset={"sunset"} background blur={0.7} />
        <fog attach="fog" args={["white", 50, 190]} />
      </Suspense>
      <OrbitControls />
      <EffectComposer>
        <Bloom luminanceThreshold={10} luminanceSmoothing={10} height={300} />
        <Noise opacity={0.2} />
      </EffectComposer>
    </Canvas>
  );
};

export default App;
