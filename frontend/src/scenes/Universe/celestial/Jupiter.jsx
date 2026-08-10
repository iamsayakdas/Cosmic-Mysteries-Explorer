import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import jupiterTexture from "../../../assets/textures/jupiter/jupiter.jpg";

export default function Jupiter() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(jupiterTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Jupiter orbit around the Sun
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

      {/* ========================= */}
      {/* JUPITER */}
      {/* ========================= */}

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
          map={texture}
          bumpMap={texture}
          bumpScale={0.006}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Jupiter"
          visible={hovered}
        />
      </mesh>

    </group>
  );
}