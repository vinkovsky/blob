import { Mesh, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Airplane = () => {
  const mesh = useRef<Mesh>(null!);
  const {
    scene: {
      children: [{ geometry }],
    },
  } = useGLTF("/paper_plane/scene.gltf");

  useFrame(({ mouse }) => {
    const airplane = mesh.current;

    airplane.position.x = MathUtils.lerp(
      airplane.position.x,
      mouse.x / 2,
      0.08
    );
    airplane.rotation.x = MathUtils.lerp(
      airplane.rotation.x,
      mouse.y / 2,
      0.03
    );

    airplane.position.y = MathUtils.lerp(
      airplane.position.y,
      mouse.y / 2,
      0.08
    );
    airplane.rotation.y =
      MathUtils.lerp(airplane.rotation.y, mouse.x, 0.02) + 0.07;
    console.log(airplane.rotation.y);
  });

  return (
    <mesh
      ref={mesh}
      castShadow
      receiveShadow
      position={[0, 0, 0]}
      rotation={[0, 15, -4]}
      geometry={geometry}
    >
      <meshPhysicalMaterial
        roughness={0.7}
        metalness={0.1}
        clearcoat={0.2}
        color="#0D49F9"
      />
    </mesh>
  );
};

export default Airplane;
