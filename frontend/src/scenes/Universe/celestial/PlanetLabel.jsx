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
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Arial, sans-serif",

          background: "rgba(0, 0, 0, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.25)",

          padding: "5px 10px",
          borderRadius: "6px",

          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",

          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",

          boxShadow:
            "0 0 10px rgba(0, 0, 0, 0.45)",

          textShadow:
            "0 0 5px rgba(255, 255, 255, 0.35)",

          transform: "translateY(-2px)",
        }}
      >
        {name}
      </div>
    </Html>
  );
}