import { Canvas } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  PresentationControls,
  Stage,
} from '@react-three/drei'
import { Suspense } from 'react'

const StudioPage = () => {
  return (
    <div className="dark h-screen w-full bg-main-bg">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-mapSize={[512, 512]}
          castShadow
        />

        <PresentationControls
          global
          // FIX 1: Thay 'config' bằng 'damping' theo định nghĩa PresentationControlProps
          damping={0.2}
          // FIX 2: snap theo định nghĩa nhận Boolean hoặc number
          snap={0.5}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Suspense fallback={null}>
            {/* FIX 3: Thay 'contactShadows' bằng 'shadows' theo định nghĩa StageProps */}
            {/* Bạn có thể truyền boolean 'true' hoặc object StageShadows */}
            <Stage
              environment="city"
              intensity={0.6}
              shadows={{ type: 'contact', opacity: 0.7, blur: 2 }}
            >
              <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[1, 64, 64]} />
                  <MeshDistortMaterial
                    color="#f9fafb"
                    speed={5}
                    distort={0.4}
                    radius={1}
                  />
                </mesh>
              </Float>
            </Stage>
          </Suspense>
        </PresentationControls>

        {/* Nền */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial color="#111827" />
        </mesh>
      </Canvas>
    </div>
  )
}

export default StudioPage
