import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import marsTexture from "../../../assets/textures/mars/mars.jpg";

export default function Mars() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(marsTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mars orbit around the Sun
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

      {/* ========================= */}
      {/* MARS */}
      {/* ========================= */}

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
        <sphereGeometry args={[0.24, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          bumpMap={texture}
          bumpScale={0.018}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Mars"
          visible={hovered}
        />
      </mesh>

    </group>
  );
}