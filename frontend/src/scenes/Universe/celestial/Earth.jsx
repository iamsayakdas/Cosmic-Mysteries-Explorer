import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import PlanetLabel from "./PlanetLabel";
import Moon from "./Moon";

export default function Earth() {
  const orbitRef = useRef();
  const earthRef = useRef();

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Earth's orbit around the Sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.25;
    }

    // Earth's rotation
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[4, 0, 0]}>
        <mesh
          ref={earthRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry args={[0.45, 64, 64]} />

          <meshStandardMaterial color="#2E86DE" />

          <PlanetLabel
            name="Earth"
            visible={hovered}
          />
        </mesh>

        <Moon />
      </group>
    </group>
  );
}