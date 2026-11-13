
function Room3D({ onClearSelection }) {
  return (
    <group>

      {/* PISO */}
      <mesh
        position={[0, -0.09, 0]}
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onClearSelection();
        }}
      >
        <boxGeometry args={[10, 0.18, 8]} />

        <meshStandardMaterial
          color="#d8d0c2"
          roughness={0.85}
        />
      </mesh>

      {/* PAREDE DO FUNDO */}
      <mesh
        position={[0, 1.6, -4]}
        receiveShadow
      >
        <boxGeometry args={[10, 3.2, 0.15]} />

        <meshStandardMaterial
          color="#f1eee7"
          roughness={0.95}
        />
      </mesh>

      {/* PAREDE LATERAL */}
      <mesh
        position={[-5, 1.6, 0]}
        receiveShadow
      >
        <boxGeometry args={[0.15, 3.2, 8]} />

        <meshStandardMaterial
          color="#e5e6dc"
          roughness={0.95}
        />
      </mesh>

      {/* GRADE DE REFERÊNCIA */}
      <gridHelper
        args={[10, 20, "#9da99c", "#c8cec5"]}
        position={[0, 0.006, 0]}
      />

    </group>
  );
}

export default Room3D;
