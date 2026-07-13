import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Earth() {
  const orbitRef = useRef();
  const earthRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Orbit around the Sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.25;
    }

    // Rotate Earth on its own axis
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={earthRef} position={[4, 0, 0]}>
        <sphereGeometry args={[0.45, 64, 64]} />
        <meshStandardMaterial color="#2E86DE" />
      </mesh>
    </group>
  );
}