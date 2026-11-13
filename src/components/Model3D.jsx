
import { useMemo } from "react";
import {
  Box3,
  Vector3,
  Color,
  MeshStandardMaterial,
  SRGBColorSpace,
} from "three";
import { useGLTF } from "@react-three/drei";

/* Plugin para a extensão KHR_materials_pbrSpecularGlossiness,
 * removida do GLTFLoader em versões recentes do Three.js.
 * Converte materiais specular-glossiness para o padrão
 * metallic-roughness usado pelo MeshStandardMaterial. */
class PBRSpecularGlossinessExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = "KHR_materials_pbrSpecularGlossiness";
  }

  getMaterialType() {
    return MeshStandardMaterial;
  }

  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    const extension = materialDef.extensions?.[this.name];

    if (!extension) {
      return Promise.resolve();
    }

    const pending = [];

    // Textura difusa → mapa de cor base
    if (extension.diffuseTexture !== undefined) {
      pending.push(
        parser.assignTexture(
          materialParams,
          "map",
          extension.diffuseTexture,
          SRGBColorSpace
        )
      );
    }

    // Fator difuso → cor base
    if (Array.isArray(extension.diffuseFactor)) {
      materialParams.color = new Color().fromArray(
        extension.diffuseFactor
      );
    }

    // Glossiness → roughness (relação inversa), não-metálico
    materialParams.roughness = 1 - (extension.glossinessFactor ?? 1);
    materialParams.metalness = 0;

    return Promise.all(pending);
  }
}

// Callback estável para evitar registro duplicado no loader.
const createExtension = (parser) =>
  new PBRSpecularGlossinessExtension(parser);

const registerExtension = (loader) => {
  loader.register(createExtension);
};

function Model3D({ src, color = null }) {
  const { scene } = useGLTF(
    src,
    undefined,
    undefined,
    registerExtension
  );

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      // Cria cópias dos materiais para
      // evitar alterar o modelo original.
      if (color && child.material) {
        const applyColor = (material) => {
          const materialClone = material.clone();

          if (materialClone.color) {
            materialClone.color.set(color);
          }

          return materialClone;
        };

        child.material = Array.isArray(child.material)
          ? child.material.map(applyColor)
          : applyColor(child.material);
      } else if (child.material) {
        child.material.needsUpdate = true;
      }
    });

    const box = new Box3().setFromObject(clone);

    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    const largestAxis = Math.max(
      size.x,
      size.y,
      size.z
    );

    const factor =
      largestAxis > 0 ? 2 / largestAxis : 1;

    clone.scale.multiplyScalar(factor);

    clone.position.set(
      -center.x * factor,
      -box.min.y * factor,
      -center.z * factor
    );

    return clone;

  }, [scene, color]);

  return <primitive object={model} />;
}

export default Model3D;
