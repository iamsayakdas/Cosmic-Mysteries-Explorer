import { Html } from "@react-three/drei";

export default function PlanetLabel({ name, visible }) {
  if (!visible) return null;

  return (
    <Html
      position={[0, 0.7, 0]}
      center
      distanceFactor={8}
      pointerEvents="none"
    >
      <div
        style={{
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Arial, sans-serif",
          background: "rgba(0, 0, 0, 0.75)",
          padding: "5px 10px",
          borderRadius: "6px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {name}
      </div>
    </Html>
  );
}