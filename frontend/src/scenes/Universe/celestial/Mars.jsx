import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Mars() {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Mars orbits slower than Earth
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.20;
    }

    // Mars rotates on its axis
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[5, 0, 0]}>
        <sphereGeometry args={[0.24, 48, 48]} />

        <meshStandardMaterial
          color="#B55239"
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}