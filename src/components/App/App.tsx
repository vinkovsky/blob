import { Environment, Lightformer } from "@react-three/drei";
import { Noise, EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Blob from "../Blob";

const App: FC = () => (
  <div
    style={{
      width: 600,
      height: 780,
      position: "absolute",
      background: "#3F58FD",
      top: 20,
      right: -100,
    }}
  >
    <div
      style={{
        width: 600,
        height: 500,
        position: "absolute",
        background: "black",
        top: 0,
      }}
    />
    <div
      style={{
        width: 600,
        height: 300,
        position: "absolute",
        background: "#D5045B",
        top: 0,
      }}
    />

    <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
      <Blob />
      <Environment resolution={32}>
        <group rotation={[Math.PI / 4, 0.5, 0]}>
          <Lightformer
            intensity={6}
            color="red"
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
      {/* <EffectComposer>
        <Noise opacity={0.5} />
      </EffectComposer> */}
    </Canvas>
  </div>
);

export default App;
