import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import mercuryTexture from "../../../assets/textures/mercury/mercury.jpg";

export default function Mercury() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(mercuryTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mercury orbit around the Sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.45;
    }

    // Mercury rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>

      {/* ========================= */}
      {/* MERCURY */}
      {/* ========================= */}

      <mesh
        ref={planetRef}
        position={[2, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.16, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          bumpMap={texture}
          bumpScale={0.025}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Mercury"
          visible={hovered}
        />
      </mesh>

    </group>
  );
}