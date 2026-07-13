import { Stars } from "@react-three/drei";

export default function StarField() {
  return (
    <Stars
      radius={300}
      depth={60}
      count={10000}
      factor={7}
      saturation={0}
      fade
      speed={1}
    />
  );
}