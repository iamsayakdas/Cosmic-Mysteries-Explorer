import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import venusTexture from "../../../assets/textures/venus/venus.jpg";

export default function Venus() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(venusTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Venus orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.32;
    }

    // Venus rotates slowly in the opposite direction
    if (planetRef.current) {
      planetRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[3, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.3, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Venus"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}