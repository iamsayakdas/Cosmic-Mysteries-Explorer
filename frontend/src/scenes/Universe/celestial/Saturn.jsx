import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import PlanetLabel from "./PlanetLabel";
import { usePlanetSelection } from "../PlanetSelectionContext";

import saturnTexture from "../../../assets/textures/saturn/saturn.jpg";
import saturnRingTexture from "../../../assets/textures/saturn/saturn-ring.png";

export default function Saturn() {
  const orbitRef = useRef();
  const saturnRef = useRef();

  const [hovered, setHovered] = useState(false);

  const { setSelectedPlanet } = usePlanetSelection();

  const texture = useTexture(saturnTexture);
  const ringTexture = useTexture(saturnRingTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Saturn orbit around the Sun
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.09;
    }

    // Saturn rotation
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[-5.5, 0, 0]}>

        {/* ========================= */}
        {/* SATURN */}
        {/* ========================= */}

        <mesh
          ref={saturnRef}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => {
            setHovered(false);
          }}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedPlanet("Saturn");
          }}
        >
          <sphereGeometry args={[0.55, 64, 64]} />

          <meshStandardMaterial
            map={texture}
            bumpMap={texture}
            bumpScale={0.004}
            color="#ffffff"
            roughness={1}
            metalness={0}
          />

          <PlanetLabel
            name="Saturn"
            visible={hovered}
          />
        </mesh>

        {/* ========================= */}
        {/* SATURN RINGS */}
        {/* ========================= */}

        <mesh
          rotation={[Math.PI / 2.8, 0, 0]}
          renderOrder={1}
        >
          <ringGeometry
            args={[0.72, 1.25, 256]}
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

                // Convert ring UV coordinates
                // into radial distance.
                vec2 centered =
                  vUv - 0.5;

                float radius =
                  length(centered) * 2.0;

                // Read the radial ring texture.
                vec4 ring =
                  texture2D(
                    ringTexture,
                    vec2(radius, 0.5)
                  );

                // Remove transparent areas.
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

      </group>
    </group>
  );
}