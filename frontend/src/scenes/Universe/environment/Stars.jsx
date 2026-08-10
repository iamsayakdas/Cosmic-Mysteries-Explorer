import { Stars } from "@react-three/drei";

export default function StarField() {
  return (
    <Stars
      radius={400}
      depth={100}
      count={12000}
      factor={5}
      saturation={0}
      fade
      speed={2.0}
    />
  );
}