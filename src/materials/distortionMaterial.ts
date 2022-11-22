import {
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  Shader,
} from "three";

import snoise from "glsl-noise/simplex/4d.glsl";

export class DistortionMaterial extends MeshPhysicalMaterial {
  private _uTime = { value: 1.0 };
  private _uRadius = { value: 1.0 };

  constructor(parameters: MeshPhysicalMaterialParameters) {
    super();
    this.setValues(parameters);
  }

  onBeforeCompile(shader: Shader) {
    shader.uniforms.uTime = this._uTime;
    shader.uniforms.uRadius = this._uRadius;

    shader.vertexShader = `
    uniform float uTime;
    uniform float uRadius;
    ${snoise}
    float noise(vec3 p){
      float n = snoise(vec4(p, uTime));
      n = sin(n * 3.1415926 * 8.);
      n = n * 0.5 + 0.5;
      n *= n;
      return n;
    }
    vec3 getPos(vec3 p){
      // return p * (uRadius + noise(p * 0.875) * 0.25);
      return p * (4. + noise(p * 0.875) * 0.25);
    }
    ${shader.vertexShader}
    `
      .replace(
        `#include <beginnormal_vertex>`,
        `#include <beginnormal_vertex>

        vec3 p0 = getPos(position);

        // https://stackoverflow.com/a/39296939/4045502

        float theta = .1;
        vec3 vecTangent = normalize(cross(p0, vec3(1.0, 0.0, 0.0)) + cross(p0, vec3(0.0, 1.0, 0.0)));
        vec3 vecBitangent = normalize(cross(vecTangent, p0));
        vec3 ptTangentSample = getPos(normalize(p0 + theta * normalize(vecTangent)));
        vec3 ptBitangentSample = getPos(normalize(p0 + theta * normalize(vecBitangent)));

        objectNormal = normalize(cross(ptBitangentSample - p0, ptTangentSample - p0));
      `
      )
      .replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
        transformed = p0;
      `
      );
  }

  get uTime() {
    return this._uTime.value;
  }

  set uTime(t) {
    this._uTime.value = t;
  }

  get uRadius() {
    return this._uRadius.value;
  }

  set uRadius(r) {
    this._uRadius.value = r;
  }
}
