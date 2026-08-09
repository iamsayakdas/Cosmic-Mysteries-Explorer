import { Sphere } from "@react-three/drei";

export default function Nebula() {
  return (
    <Sphere args={[120, 64, 64]}>
      <meshBasicMaterial
        color="#0b1026"
        side={1}
        transparent
        opacity={0.35}
      />
    </Sphere>
  );
}