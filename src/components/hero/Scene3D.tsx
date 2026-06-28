import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import type { Group, Mesh } from 'three'

/**
 * Abstract architectural composition: floating marble blocks, a copper
 * wireframe box, a distorted metallic sphere and a gold torus.
 *
 * Polygon counts are deliberately low (sphere 32×32, torus 12×48, small
 * sphere 16×16) and shadows are disabled — this only ever mounts on desktop.
 */
function Composition() {
  const group = useRef<Group>(null)
  const sphere = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.15) * 0.25
      group.current.position.y = Math.sin(t * 0.4) * 0.08
    }
    if (sphere.current) {
      sphere.current.rotation.x = t * 0.2
      sphere.current.rotation.y = t * 0.15
    }
  })

  return (
    <group ref={group}>
      {/* Distorted metallic sphere — the centrepiece */}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={sphere} position={[0.2, 0.1, 0]}>
          <sphereGeometry args={[1.15, 32, 32]} />
          <MeshDistortMaterial
            color="#caa472"
            metalness={0.9}
            roughness={0.18}
            distort={0.32}
            speed={1.6}
          />
        </mesh>
      </Float>

      {/* Copper wireframe box */}
      <Float speed={1.1} rotationIntensity={0.9} floatIntensity={1.1}>
        <mesh position={[-2.2, 0.9, -0.5]} rotation={[0.5, 0.4, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial color="#c0673a" wireframe metalness={0.6} roughness={0.4} />
        </mesh>
      </Float>

      {/* Gold torus */}
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.3}>
        <mesh position={[2.4, 1.1, -0.4]} rotation={[1.1, 0.2, 0]}>
          <torusGeometry args={[0.6, 0.22, 12, 48]} />
          <meshStandardMaterial color="#d9a441" metalness={1} roughness={0.22} />
        </mesh>
      </Float>

      {/* Floating marble blocks */}
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-1.9, -1.4, 0.4]} rotation={[0.2, 0.6, 0.1]}>
          <boxGeometry args={[1.1, 0.5, 0.7]} />
          <meshStandardMaterial color="#f3efe9" metalness={0.1} roughness={0.6} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[2.0, -1.2, 0.2]} rotation={[0.3, -0.5, 0.2]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#e7e1d8" metalness={0.15} roughness={0.55} />
        </mesh>
      </Float>

      {/* Small accent sphere */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
        <mesh position={[1.2, -0.2, 1.2]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#c0673a" metalness={0.8} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <spotLight position={[6, 8, 6]} angle={0.3} penumbra={1} intensity={2.2} castShadow={false} />
      <spotLight position={[-6, -2, 4]} angle={0.4} penumbra={1} intensity={1.1} color="#c0673a" castShadow={false} />
      <Suspense fallback={null}>
        <Composition />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
