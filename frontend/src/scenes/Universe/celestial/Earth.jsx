import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Moon from "./Moon";

export default function Earth() {
  const orbitRef = useRef();
  const earthRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.25;
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[4, 0, 0]}>
        <mesh ref={earthRef}>
          <sphereGeometry args={[0.45, 64, 64]} />
          <meshStandardMaterial color="#2E86DE" />
        </mesh>

        <Moon />
      </group>
    </group>
  );
}