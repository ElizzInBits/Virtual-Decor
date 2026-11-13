import { useRef } from "react";
import { TransformControls } from "@react-three/drei";

import Model3D from "./Model3D";

function FurnitureInstance({
  item,
  selected,
  mode,
  onSelect,
  onUpdate,
}) {
  const groupRef = useRef(null);

  function saveTransform() {
    const object = groupRef.current;

    if (!object) return;

    onUpdate(item.instanceId, {
      position: object.position.toArray(),
      rotation: object.rotation.toArray().slice(0, 3),
      scale: object.scale.toArray(),
    });
  }

  return (
    <>
      <group
        ref={groupRef}
        position={item.position}
        rotation={item.rotation}
        scale={item.scale}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(item.instanceId);
        }}
      >
        <Model3D
          src={item.model}
          color={item.color}
        />

        {selected && (
          <mesh
            position={[0, 0.02, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[1.05, 1.1, 48]} />

            <meshBasicMaterial color="#477c58" />
          </mesh>
        )}
      </group>

      {selected && (
        <TransformControls
          object={groupRef}
          mode={mode}
          size={0.8}
          translationSnap={0.1}
          rotationSnap={Math.PI / 12}
          scaleSnap={0.1}
          onMouseUp={saveTransform}
        />
      )}
    </>
  );
}

export default FurnitureInstance;
