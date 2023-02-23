import { IcosahedronGeometry, Mesh, MathUtils } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { mergeVertices } from "three-stdlib";
import { DistortionMaterial } from "../../materials/distortionMaterial";

extend({ DistortionMaterial });

const icosahedronGeometry = new IcosahedronGeometry(1, 200);
icosahedronGeometry.deleteAttribute("normal");
icosahedronGeometry.deleteAttribute("uv");

const bufferIcosahedronGeometry = mergeVertices(icosahedronGeometry);
bufferIcosahedronGeometry.computeVertexNormals();

const Blob = () => {
  const material = useRef<Pick<DistortionMaterial, "uTime">>({ uTime: 0 });
  const mesh = useRef<Mesh>(null!);

  useFrame(({ clock, mouse }) => {
    const blob = mesh.current;

    material.current.uTime = clock.elapsedTime * 0.1;

    blob.position.x = MathUtils.lerp(blob.position.x, mouse.x / 2, 0.08);
    blob.rotation.x = MathUtils.lerp(blob.rotation.x, mouse.y / 2, 0.03);

    blob.position.y = MathUtils.lerp(blob.position.y, mouse.y / 2, 0.08);
    blob.rotation.y = MathUtils.lerp(blob.rotation.y, mouse.x / 2, 0.03);
  });

  return (
    <mesh
      ref={mesh}
      castShadow
      receiveShadow
      geometry={bufferIcosahedronGeometry}
      position={[0, 0, 0]}
    >
      <distortionMaterial roughness={0.8} clearcoat={0.8} ref={material} />
    </mesh>
  );
};

export default Blob;
