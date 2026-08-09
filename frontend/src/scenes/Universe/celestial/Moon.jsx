import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

import PlanetLabel from "./PlanetLabel";
import moonTexture from "../../../assets/textures/moon/moon.jpg";

export default function Moon() {
  const moonOrbitRef = useRef();
  const moonRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(moonTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Moon orbit around Earth
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y = t * 1.5;
    }

    // Moon rotation
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={moonOrbitRef}>
      <mesh
        ref={moonRef}
        position={[0.9, 0, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.12, 48, 48]} />

        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={1}
          metalness={0}
        />

        <PlanetLabel
          name="Moon"
          visible={hovered}
        />
      </mesh>
    </group>
  );
}