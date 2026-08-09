import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Jupiter() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Jupiter orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.12;
    }

    // Jupiter rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.018;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[6.5, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.75, 64, 64]} />

        <meshStandardMaterial
          color="#C9A77A"
          roughness={0.9}
        />

        <PlanetLabel
          name="Jupiter"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}