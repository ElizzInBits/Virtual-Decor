
import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
} from "@react-three/drei";

import Room3D from "./Room3D";
import FurnitureInstance from "./FurnitureInstance";

function Scene3D({
  items,
  selectedId,
  setSelectedId,
  transformMode,
  onUpdateItem,
}) {
  return (
    <Canvas
      camera={{
        position: [10, 8, 11],
        fov: 40,
      }}
      shadows
      dpr={[1, 1.5]}
      onPointerMissed={() => setSelectedId(null)}
    >
      <color
        attach="background"
        args={["#edf0eb"]}
      />

      {/* ILUMINAÇÃO */}
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
      />

      {/* AMBIENTE */}
      <Room3D
        onClearSelection={() => setSelectedId(null)}
      />

      {/* MÓVEIS */}
      <Suspense fallback={null}>
        {items.map((item) => (
          <FurnitureInstance
            key={item.instanceId}
            item={item}
            selected={selectedId === item.instanceId}
            mode={transformMode}
            onSelect={setSelectedId}
            onUpdate={onUpdateItem}
          />
        ))}
      </Suspense>

      {/* CONTROLE DA CÂMERA */}
      <OrbitControls
        makeDefault
        target={[0, 0.7, 0]}
        minDistance={5}
        maxDistance={18}
        maxPolarAngle={Math.PI / 2.05}
      />

    </Canvas>
  );
}

export default Scene3D;
