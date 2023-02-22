import {
  MeshPhysicalMaterial,
  Shader,
  MeshPhysicalMaterialParameters,
  IcosahedronGeometry,
} from "three";
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

  useFrame(({ clock }) => {
    material.current.uTime = clock.elapsedTime * 0.1;
  });

  return (
    <mesh
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
