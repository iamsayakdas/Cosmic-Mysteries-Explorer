import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import neptuneTexture from "../../../assets/textures/neptune/neptune.jpg";

export default function Neptune() {
  const orbitRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(neptuneTexture);

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
        <sphereGeometry args={[0.40, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Neptune"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}