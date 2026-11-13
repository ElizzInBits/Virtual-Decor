/*disponibiliza os controles para observar os móveis. */
import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  ContactShadows,
  Environment
} from "@react-three/drei";

import Model3D from "./Model3D";

function ModelPreview({ src }) {
  return (
    <div className="model-preview">

      <Canvas
        camera={{
          position: [3, 2.2, 3],
          fov: 40
        }}
        shadows
      >

        <color
          attach="background"
          args={["#eff1e9"]}
        />

        <ambientLight intensity={1.4} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2}
          castShadow
        />

        <Environment preset="apartment" />

        <Suspense fallback={null}>

          <Model3D src={src} />

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.3}
            scale={4}
            blur={2.5}
            far={3}
          />

        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={2.3}
          maxDistance={7}
          target={[0, 0.8, 0]}
        />

      </Canvas>

      <span className="model-hint">
        Arraste para girar · Scroll para aproximar
      </span>

    </div>
  );
}

export default ModelPreview;
