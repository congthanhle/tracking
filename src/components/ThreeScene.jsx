import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

export default function ThreeJSScene() {
  return (
    <Canvas style={{ height: 400, width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      
      <Suspense fallback={null}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="orange" />
        </Sphere>
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
