import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC, Suspense } from "react";
import Blob from "../Blob";
import Airplane from "../Airplane/Airplane";

const App: FC = () => (
  <div
    style={{
      width: "100%",
      height: 780,
      position: "absolute",
      background: "#C7DAF2",
      top: 20,
      right: -100,
    }}
  >
    <div
      style={{
        width: 600,
        height: 600,
        position: "absolute",
        // background: "black",
        top: 0,
      }}
    />
    <div
      style={{
        width: 600,
        height: 300,
        position: "absolute",
        // background: "#D5045B",
        top: 0,
      }}
    />

    <Canvas shadows camera={{ position: [0, 0, 50], fov: 50 }}>
      {/* <Blob /> */}
      <Suspense fallback={null}>
        <Airplane />
      </Suspense>

      <Environment resolution={32}>
        <group rotation={[Math.PI / 4, 0.5, 0]}>
          <Lightformer
            intensity={6}
            color="white"
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
            intensity={3}
            color="#51A1FF"
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
    </Canvas>
  </div>
);

export default App;
