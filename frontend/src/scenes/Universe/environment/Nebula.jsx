import { Sphere } from "@react-three/drei";

export default function Nebula() {
  return (
    <Sphere args={[120, 64, 64]}>
      <meshBasicMaterial
        color="#182044"
        side={1}
        transparent
        opacity={0.16}
        depthWrite={false}
      />
    </Sphere>
  );
}