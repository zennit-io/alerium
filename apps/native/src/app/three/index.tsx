import { Canvas, useFrame } from "@react-three/fiber/native";
import { Environment, useGLTF } from "@react-three/drei/native";
import { Suspense } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default () => {
  return (
    <Canvas camera={{ position: [-6, 0, 16], fov: 36 }}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />

      <Suspense>
        <Environment preset="park" />
        <IPhone />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.9} />
      </EffectComposer>
    </Canvas>
  );
};

const IPhone = () => {
  const asset: string = require("@assets/models/iphone.glb");
  const { scene } = useGLTF(asset);
  useFrame(() => {
    scene.rotation.y += 0.01;
  });
  return <primitive object={scene} />;
};
