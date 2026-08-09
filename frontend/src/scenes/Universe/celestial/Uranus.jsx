import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import uranusTexture from "../../../assets/textures/uranus/uranus.jpg";

export default function Uranus() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(uranusTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Uranus orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.055;
    }

    // Uranus rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.006;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[8, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.42, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Uranus"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}