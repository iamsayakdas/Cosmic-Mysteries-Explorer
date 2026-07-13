import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Saturn() {
  const orbitRef = useRef();
  const saturnRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.12;
    }

    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[-7, 0, 0]}>
        {/* Saturn */}
        <mesh ref={saturnRef}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial color="#D9B56D" />
        </mesh>

        {/* Ring */}
        <mesh rotation={[Math.PI / 2.8, 0, 0]}>
          <ringGeometry args={[1.1, 1.8, 64]} />
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