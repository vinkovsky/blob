import { Object3DNode } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: Object3DNode<
        DistortionMaterial,
        typeof DistortionMaterial
      >;
    }
  }
}
