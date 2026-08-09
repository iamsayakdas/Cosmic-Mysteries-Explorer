import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Neptune() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Neptune orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.035;
    }

    // Neptune rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[10, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.40, 48, 48]} />

        <meshStandardMaterial
          color="#4169E1"
          roughness={0.85}
        />

        <PlanetLabel
          name="Neptune"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}