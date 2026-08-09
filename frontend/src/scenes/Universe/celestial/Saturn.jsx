import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";

export default function Saturn() {
  const orbitRef = useRef();
  const saturnRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Saturn orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.09;
    }

    // Saturn rotation
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[-5.5, 0, 0]}>
        {/* Saturn */}
        <mesh
          ref={saturnRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry args={[0.55, 48, 48]} />

          <meshStandardMaterial
            color="#D9B56D"
            roughness={0.9}
          />

          <PlanetLabel
            name="Saturn"
            visible={hovered}
          />
        </mesh>

        {/* Saturn's rings */}
        <mesh rotation={[Math.PI / 2.8, 0, 0]}>
          <ringGeometry args={[0.75, 1.25, 64]} />

          <meshStandardMaterial
            color="#C8B28C"
            side={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}