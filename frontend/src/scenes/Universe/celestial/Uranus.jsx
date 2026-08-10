import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import PlanetLabel from "./PlanetLabel";
import uranusTexture from "../../../assets/textures/uranus/uranus.jpg";

export default function Uranus() {
  const orbitRef = useRef();
  const planetRef = useRef();
  const atmosphereRef = useRef();

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(uranusTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Uranus orbit around the Sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.055;
    }

    // Uranus rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.006;
    }

    // Very slow atmospheric movement
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0004;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[8, 0, 0]}>

        {/* ========================= */}
        {/* URANUS */}
        {/* ========================= */}

        <mesh
          ref={planetRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry args={[0.42, 64, 64]} />

          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={1}
            metalness={0}
          />

          <PlanetLabel
            name="Uranus"
            visible={hovered}
          />
        </mesh>

        {/* ========================= */}
        {/* URANUS ATMOSPHERE */}
        {/* ========================= */}

        <mesh
          ref={atmosphereRef}
          scale={1.025}
          renderOrder={4}
        >
          <sphereGeometry args={[0.42, 64, 64]} />

          <shaderMaterial
            transparent
            depthWrite={false}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            uniforms={{
              atmosphereColor: {
                value: new THREE.Color("#8ee8ee"),
              },
            }}

            vertexShader={`
              varying vec3 vNormal;
              varying vec3 vViewDirection;

              void main() {
                vec4 worldPosition =
                  modelMatrix *
                  vec4(position, 1.0);

                vNormal =
                  normalize(
                    mat3(modelMatrix) *
                    normal
                  );

                vViewDirection =
                  normalize(
                    cameraPosition -
                    worldPosition.xyz
                  );

                gl_Position =
                  projectionMatrix *
                  viewMatrix *
                  worldPosition;
              }
            `}

            fragmentShader={`
              uniform vec3 atmosphereColor;

              varying vec3 vNormal;
              varying vec3 vViewDirection;

              void main() {

                float viewDot =
                  dot(
                    normalize(vNormal),
                    normalize(vViewDirection)
                  );

                float rim =
                  pow(
                    1.0 -
                    abs(viewDot),
                    3.5
                  );

                float intensity =
                  rim * 0.18;

                gl_FragColor =
                  vec4(
                    atmosphereColor,
                    intensity
                  );
              }
            `}
          />
        </mesh>

      </group>
    </group>
  );
}