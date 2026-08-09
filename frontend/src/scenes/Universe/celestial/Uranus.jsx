import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Uranus() {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Uranus orbits slower than Jupiter
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.055;
    }

    // Uranus rotates slowly
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.006;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[8, 0, 0]}>
        <sphereGeometry args={[0.42, 48, 48]} />

        <meshStandardMaterial
          color="#A8DADC"
          roughness={0.85}
        />
      </mesh>
    </group>
  );
}