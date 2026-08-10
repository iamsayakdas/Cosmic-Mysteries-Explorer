import { useState } from "react";

const planetData = {
  Sun: {
    type: "Star",
    description:
      "The star at the center of our solar system.",
  },

  Mercury: {
    type: "Terrestrial Planet",
    description:
      "The smallest planet and the closest planet to the Sun.",
  },

  Venus: {
    type: "Terrestrial Planet",
    description:
      "A hot, cloudy world with a thick atmosphere.",
  },

  Earth: {
    type: "Terrestrial Planet",
    description:
      "Our home planet, with liquid surface water and a rich atmosphere.",
  },

  Moon: {
    type: "Natural Satellite",
    description:
      "Earth's natural satellite.",
  },

  Mars: {
    type: "Terrestrial Planet",
    description:
      "A cold, rocky world known for its reddish surface.",
  },

  Jupiter: {
    type: "Gas Giant",
    description:
      "The largest planet in the solar system.",
  },

  Saturn: {
    type: "Gas Giant",
    description:
      "A gas giant famous for its extensive ring system.",
  },

  Uranus: {
    type: "Ice Giant",
    description:
      "A cold ice giant with a distinctive tilted rotation.",
  },

  Neptune: {
    type: "Ice Giant",
    description:
      "A distant blue ice giant in the outer solar system.",
  },
};

export default function PlanetInfoPanel({
  planetName,
  onClose,
}) {
  const [closing, setClosing] = useState(false);

  if (!planetName) {
    return null;
  }

  const planet = planetData[planetName];

  if (!planet) {
    return null;
  }

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 180);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",

        width: "300px",
        maxWidth: "calc(100vw - 48px)",

        padding: "20px",

        background:
          "rgba(5, 8, 20, 0.88)",

        border:
          "1px solid rgba(255, 255, 255, 0.18)",

        borderRadius: "14px",

        color: "#ffffff",

        fontFamily:
          "Arial, sans-serif",

        backdropFilter:
          "blur(12px)",

        WebkitBackdropFilter:
          "blur(12px)",

        boxShadow:
          "0 12px 40px rgba(0, 0, 0, 0.45)",

        zIndex: 1000,

        opacity: closing ? 0 : 1,

        transform: closing
          ? "translateX(20px)"
          : "translateX(0)",

        transition:
          "opacity 180ms ease, transform 180ms ease",
      }}
    >
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          {planetName}
        </h2>

        <button
          onClick={handleClose}
          style={{
            width: "30px",
            height: "30px",

            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "50%",

            background:
              "rgba(255,255,255,0.08)",

            color: "#ffffff",

            fontSize: "18px",
            lineHeight: "1",

            cursor: "pointer",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* ========================= */}
      {/* TYPE */}
      {/* ========================= */}

      <div
        style={{
          display: "inline-block",

          padding: "5px 9px",

          marginBottom: "14px",

          borderRadius: "6px",

          background:
            "rgba(90, 150, 255, 0.14)",

          border:
            "1px solid rgba(90, 150, 255, 0.22)",

          color: "#9fc4ff",

          fontSize: "12px",

          fontWeight: "600",
        }}
      >
        {planet.type}
      </div>

      {/* ========================= */}
      {/* DESCRIPTION */}
      {/* ========================= */}

      <p
        style={{
          margin: 0,

          color:
            "rgba(255,255,255,0.78)",

          fontSize: "14px",

          lineHeight: "1.6",
        }}
      >
        {planet.description}
      </p>
    </div>
  );
}