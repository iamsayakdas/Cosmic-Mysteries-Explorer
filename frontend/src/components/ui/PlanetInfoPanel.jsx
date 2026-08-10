import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import sunTexture from "../../assets/textures/sun/sun.jpg";
import mercuryTexture from "../../assets/textures/mercury/mercury.jpg";
import venusTexture from "../../assets/textures/venus/venus.jpg";
import earthTexture from "../../assets/textures/earth/earth.jpg";
import moonTexture from "../../assets/textures/moon/moon.jpg";
import marsTexture from "../../assets/textures/mars/mars.jpg";
import jupiterTexture from "../../assets/textures/jupiter/jupiter.jpg";
import saturnTexture from "../../assets/textures/saturn/saturn.jpg";
import saturnRingTexture from "../../assets/textures/saturn/saturn-ring.png";
import uranusTexture from "../../assets/textures/uranus/uranus.jpg";
import neptuneTexture from "../../assets/textures/neptune/neptune.jpg";

const planetData = {
  Sun: {
    type: "Star",
    description:
      "The Sun is the star at the center of our solar system. Its immense gravity keeps the planets in orbit and its energy drives most of the activity across our planetary neighborhood.",
    distance: "0 AU",
    diameter: "1,392,700 km",
    day: "25–35 days",
    year: "225–250 million yrs",
    moons: "0",
    texture: sunTexture,
    accent: "#ffb347",
  },

  Mercury: {
    type: "Terrestrial Planet",
    description:
      "Mercury is the smallest planet and the closest planet to the Sun. Its heavily cratered surface experiences extreme temperature changes between day and night.",
    distance: "0.39 AU",
    diameter: "4,879 km",
    day: "58.6 days",
    year: "88 days",
    moons: "0",
    texture: mercuryTexture,
    accent: "#b8b8b8",
  },

  Venus: {
    type: "Terrestrial Planet",
    description:
      "Venus is a rocky world surrounded by a thick atmosphere rich in carbon dioxide. Its powerful greenhouse effect makes it the hottest planet in the solar system.",
    distance: "0.72 AU",
    diameter: "12,104 km",
    day: "243 days",
    year: "224.7 days",
    moons: "0",
    texture: venusTexture,
    accent: "#e5b66b",
  },

  Earth: {
    type: "Terrestrial Planet",
    description:
      "Earth is our home world and the only known planet with life. Its surface is covered by oceans, continents, and a protective atmosphere.",
    distance: "1 AU",
    diameter: "12,742 km",
    day: "23.9 hours",
    year: "365.25 days",
    moons: "1",
    texture: earthTexture,
    accent: "#6ea8ff",
  },

  Moon: {
    type: "Natural Satellite",
    description:
      "The Moon is Earth's natural satellite. Its gravity influences Earth's tides, while its surface preserves a record of billions of years of impacts.",
    distance: "384,400 km",
    diameter: "3,475 km",
    day: "27.3 days",
    year: "27.3 days",
    moons: "0",
    texture: moonTexture,
    accent: "#c8d0dc",
  },

  Mars: {
    type: "Terrestrial Planet",
    description:
      "Mars is a cold, rocky world known for its reddish surface. Ancient valleys and minerals suggest that liquid water once existed on its surface.",
    distance: "1.52 AU",
    diameter: "6,779 km",
    day: "24.6 hours",
    year: "687 days",
    moons: "2",
    texture: marsTexture,
    accent: "#e06b4f",
  },

  Jupiter: {
    type: "Gas Giant",
    description:
      "Jupiter is the largest planet in the solar system. Its atmosphere contains enormous storms, including the famous Great Red Spot.",
    distance: "5.20 AU",
    diameter: "139,820 km",
    day: "9.9 hours",
    year: "11.86 years",
    moons: "95+",
    texture: jupiterTexture,
    accent: "#d9b38c",
  },

  Saturn: {
    type: "Gas Giant",
    description:
      "Saturn is a massive gas giant best known for its spectacular ring system. The rings are made mostly of ice, rock, and dust particles.",
    distance: "9.58 AU",
    diameter: "116,460 km",
    day: "10.7 hours",
    year: "29.45 years",
    moons: "140+",
    texture: saturnTexture,
    accent: "#e0c27b",
  },

  Uranus: {
    type: "Ice Giant",
    description:
      "Uranus is an ice giant with a pale blue-green appearance caused by methane in its atmosphere. Its extreme axial tilt makes it appear to roll around the Sun.",
    distance: "19.2 AU",
    diameter: "50,724 km",
    day: "17.2 hours",
    year: "84 years",
    moons: "28",
    texture: uranusTexture,
    accent: "#72d9d9",
  },

  Neptune: {
    type: "Ice Giant",
    description:
      "Neptune is the farthest major planet from the Sun. It has a deep blue atmosphere with some of the fastest winds measured anywhere in the solar system.",
    distance: "30.1 AU",
    diameter: "49,244 km",
    day: "16.1 hours",
    year: "164.8 years",
    moons: "16",
    texture: neptuneTexture,
    accent: "#5d8dff",
  },
};

function PlanetPreview({ planetName, planet }) {
  const planetRef = useRef();

  const texture = useTexture(planet.texture);
  const ringTexture = useTexture(saturnRingTexture);

  const isSun = planetName === "Sun";
  const isSaturn = planetName === "Saturn";

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += isSun ? 0.004 : 0.012;
    }
  });

  const previewScale = isSaturn ? 0.72 : 1;

  return (
    <group
      scale={previewScale}
      rotation={
        isSaturn
          ? [0, 0, THREE.MathUtils.degToRad(18)]
          : [0, 0, 0]
      }
    >
      {/* ========================= */}
      {/* PLANET */}
      {/* ========================= */}

      <mesh ref={planetRef}>
        <sphereGeometry
          args={[
            isSun ? 0.62 : 0.55,
            48,
            48,
          ]}
        />

        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={isSun ? 0.7 : 0.9}
          metalness={0}
          {...(isSun && {
            emissiveMap: texture,
            emissive: "#ff9d00",
            emissiveIntensity: 1.4,
          })}
        />
      </mesh>

      {/* ========================= */}
      {/* SATURN RINGS */}
      {/* ========================= */}

      {isSaturn && (
        <mesh
          rotation={[
            Math.PI / 2.8,
            0,
            0,
          ]}
          renderOrder={2}
        >
          <ringGeometry
            args={[0.62, 0.92, 96]}
          />

          <shaderMaterial
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            uniforms={{
              ringTexture: {
                value: ringTexture,
              },
            }}
            vertexShader={`
              varying vec2 vUv;

              void main() {
                vUv = uv;

                gl_Position =
                  projectionMatrix *
                  modelViewMatrix *
                  vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform sampler2D ringTexture;

              varying vec2 vUv;

              void main() {
                vec2 centered =
                  vUv - 0.5;

                float radius =
                  length(centered) * 2.0;

                vec4 ring =
                  texture2D(
                    ringTexture,
                    vec2(radius, 0.5)
                  );

                if (ring.a < 0.03) {
                  discard;
                }

                gl_FragColor =
                  vec4(
                    ring.rgb,
                    ring.a
                  );
              }
            `}
          />
        </mesh>
      )}
    </group>
  );
}

export default function PlanetInfoPanel({
  planetName,
  onClose,
}) {
  const [visiblePlanet, setVisiblePlanet] =
    useState(planetName);

  const [isChanging, setIsChanging] =
    useState(false);

  useEffect(() => {
    if (planetName === visiblePlanet) {
      return;
    }

    setIsChanging(true);

    const timer = setTimeout(() => {
      setVisiblePlanet(planetName);
      setIsChanging(false);
    }, 140);

    return () => {
      clearTimeout(timer);
    };
  }, [planetName, visiblePlanet]);

  if (!planetName) {
    return null;
  }

  const planet = planetData[planetName];

  if (!planet) {
    return null;
  }

  const displayedPlanet =
    planetData[visiblePlanet] || planet;

  const accent =
    displayedPlanet.accent;

  return (
    <div
      style={{
        position: "fixed",

        top: "16px",
        right: "16px",

        width: "280px",
        maxWidth:
          "calc(100vw - 32px)",

        padding: "12px",

        color: "#ffffff",

        fontFamily:
          "Arial, Helvetica, sans-serif",

        /* ========================= */
        /* CLEAR TRANSPARENT GLASS */
        /* ========================= */

        background:
          "rgba(8, 8, 8, 0.18)",

        border:
          "1px solid rgba(255, 255, 255, 0.16)",

        borderRadius: "14px",

        backdropFilter:
          "blur(10px)",

        WebkitBackdropFilter:
          "blur(10px)",

        boxShadow:
          "0 12px 35px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.10)",

        zIndex: 1000,

        overflow: "hidden",

        boxSizing: "border-box",

        opacity:
          isChanging ? 0 : 1,

        transform:
          isChanging
            ? "translateY(5px) scale(0.985)"
            : "translateY(0) scale(1)",

        transition:
          "opacity 140ms ease, transform 180ms ease",
      }}
    >
      {/* ========================= */}
      {/* ACCENT LINE */}
      {/* ========================= */}

      <div
        style={{
          position: "absolute",

          top: 0,
          left: "18px",
          right: "18px",

          height: "2px",

          background: accent,

          opacity: 0.75,

          boxShadow:
            `0 0 10px ${accent}80`,
        }}
      />

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "10px",
        }}
      >
        {/* ========================= */}
        {/* PLANET PREVIEW */}
        {/* ========================= */}

        <div
          style={{
            width: "64px",
            height: "64px",

            flexShrink: 0,

            borderRadius: "10px",

            overflow: "hidden",

            background:
              "rgba(0, 0, 0, 0.08)",

            border:
              "1px solid rgba(255, 255, 255, 0.12)",

            boxShadow:
              "inset 0 0 18px rgba(255,255,255,0.03)",
          }}
        >
          <Canvas
            camera={{
              position: [0, 0, 3.2],

              fov: 35,

              near: 0.1,

              far: 10,
            }}
            gl={{
              antialias: true,

              alpha: true,
            }}
          >
            <ambientLight
              intensity={0.4}
            />

            <directionalLight
              position={[2, 2, 3]}
              intensity={2}
            />

            <PlanetPreview
              planetName={visiblePlanet}
              planet={displayedPlanet}
            />
          </Canvas>
        </div>

        {/* ========================= */}
        {/* TITLE */}
        {/* ========================= */}

        <div
          style={{
            flex: 1,

            minWidth: 0,
          }}
        >
          <h2
            style={{
              margin: 0,

              fontSize: "20px",

              fontWeight: "700",

              lineHeight: "1.1",
            }}
          >
            {visiblePlanet}
          </h2>

          <div
            style={{
              marginTop: "5px",

              color: accent,

              fontSize: "9px",

              fontWeight: "700",

              letterSpacing: "0.7px",

              textTransform:
                "uppercase",
            }}
          >
            {displayedPlanet.type}
          </div>

          <div
            style={{
              width: "28px",

              height: "2px",

              marginTop: "6px",

              borderRadius: "999px",

              background: accent,

              opacity: 0.7,

              boxShadow:
                `0 0 8px ${accent}80`,
            }}
          />
        </div>

        {/* ========================= */}
        {/* CLOSE BUTTON */}
        {/* ========================= */}

        <button
          onClick={onClose}
          aria-label="Close planet information"
          style={{
            width: "26px",

            height: "26px",

            flexShrink: 0,

            border:
              "1px solid rgba(255, 255, 255, 0.14)",

            borderRadius: "50%",

            background:
              "rgba(255,255,255,0.04)",

            color:
              "rgba(255,255,255,0.85)",

            fontSize: "16px",

            lineHeight: "1",

            cursor: "pointer",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            padding: 0,

            transition:
              "background 150ms ease, border-color 150ms ease",
          }}
        >
          ×
        </button>
      </div>

      {/* ========================= */}
      {/* DESCRIPTION */}
      {/* ========================= */}

      <p
        style={{
          margin: "11px 0",

          color:
            "rgba(255,255,255,0.68)",

          fontSize: "11px",

          lineHeight: "1.5",
        }}
      >
        {displayedPlanet.description}
      </p>

      {/* ========================= */}
      {/* DIVIDER */}
      {/* ========================= */}

      <div
        style={{
          height: "1px",

          margin:
            "2px 0 10px 0",

          background:
            `linear-gradient(
              90deg,
              ${accent}35,
              rgba(255,255,255,0.05)
            )`,
        }}
      />

      {/* ========================= */}
      {/* ASTRONOMY DATA */}
      {/* ========================= */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "6px",
        }}
      >
        <InfoItem
          label="DISTANCE"
          value={
            displayedPlanet.distance
          }
          accent={accent}
        />

        <InfoItem
          label="DIAMETER"
          value={
            displayedPlanet.diameter
          }
          accent={accent}
        />

        <InfoItem
          label="DAY"
          value={
            displayedPlanet.day
          }
          accent={accent}
        />

        <InfoItem
          label="YEAR"
          value={
            displayedPlanet.year
          }
          accent={accent}
        />

        <InfoItem
          label="MOONS"
          value={
            displayedPlanet.moons
          }
          accent={accent}
        />
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  accent,
}) {
  return (
    <div
      style={{
        padding: "7px 8px",

        minHeight: "44px",

        boxSizing: "border-box",

        borderRadius: "8px",

        background:
          "rgba(255, 255, 255, 0.025)",

        border:
          "1px solid rgba(255, 255, 255, 0.08)",

        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          marginBottom: "3px",

          color:
            "rgba(255,255,255,0.38)",

          fontSize: "7px",

          fontWeight: "700",

          letterSpacing: "0.8px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color:
            "rgba(255,255,255,0.92)",

          fontSize: "10.5px",

          fontWeight: "600",
        }}
      >
        {value}
      </div>
    </div>
  );
}