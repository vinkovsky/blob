import {
  MeshPhysicalMaterial,
  Shader,
  MeshPhysicalMaterialParameters,
  IcosahedronGeometry,
} from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { mergeVertices } from "three-stdlib";
import { DistortionMaterial } from "../../materials/distortionMaterial";
import { Center } from "@react-three/drei";

extend({ DistortionMaterial });

const Blob = () => {
  const material = useRef<Pick<DistortionMaterial, "uTime">>({ uTime: 0 });

  const geometry = useMemo(() => {
    const icosahedronGeometry = new IcosahedronGeometry(1, 200);
    icosahedronGeometry.deleteAttribute("normal");
    icosahedronGeometry.deleteAttribute("uv");

    const bufferIcosahedronGeometry = mergeVertices(icosahedronGeometry);
    bufferIcosahedronGeometry.computeVertexNormals();

    return bufferIcosahedronGeometry;
  }, []);

  useFrame(({ clock }) => {
    material.current.uTime = clock.elapsedTime * 0.1;
  });

  return (
    <Center top>
      <mesh castShadow receiveShadow geometry={geometry}>
        <distortionMaterial roughness={0.1} clearcoat={0.6} ref={material} />
      </mesh>
    </Center>
  );
};

export default Blob;
