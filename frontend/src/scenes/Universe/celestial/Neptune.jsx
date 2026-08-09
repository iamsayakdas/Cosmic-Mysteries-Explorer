import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Neptune() {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Neptune has the slowest orbit
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.035;
    }

    // Neptune rotates on its axis
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[10, 0, 0]}>
        <sphereGeometry args={[0.40, 48, 48]} />

        <meshStandardMaterial
          color="#4169E1"
          roughness={0.85}
        />
      </mesh>
    </group>
  );
}