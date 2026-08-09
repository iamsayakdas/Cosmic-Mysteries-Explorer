import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Mars() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mars orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.20;
    }

    // Mars rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[5, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.24, 48, 48]} />

        <meshStandardMaterial
          color="#B55239"
          roughness={0.95}
        />

        <PlanetLabel
          name="Mars"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}