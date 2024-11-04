import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@zennui/native/button";
import { BellIcon, SettingsIcon } from "@zennui/icons";
import { StyleSheet, View } from "react-native";
import { H1, H3 } from "@zennui/native/typography";
import { RoomCarousel } from "@/components/home/room-carousel";
import { LayoutButton } from "@/components/home/layout-button";

export default () => {
  return (
    <SafeAreaView className={"flex-1 flex gap-4"}>
      <View className={"w-full flex-row flex items-start justify-between p-6 "}>
        <View>
          <H1 className={"font-normal text-5xl"}>Hi, John!</H1>
          <H3 className={"font-normal text-xl text-foreground-dimmed"}>
            Welcome to KONE App
          </H3>
        </View>
        <View className={" flex-row flex items-center gap-4"}>
          <Button
            className={"size-12 rounded-full border-0 "}
            style={styles.shadow}
          >
            <BellIcon className={"text-primary"} />
          </Button>
          <Button
            className={"size-12 rounded-full border-0 "}
            style={styles.shadow}
          >
            <SettingsIcon className={"text-primary"} />
          </Button>
        </View>
      </View>
      <LayoutButton />
      {/*<RoomCarousel />*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.075,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment, useGLTF } from "@react-three/drei/native";
// import { Suspense } from "react";
// import { Bloom, EffectComposer } from "@react-three/postprocessing";
//
// export default () => {
//   return (
//     <Canvas camera={{ position: [-6, 0, 16], fov: 36 }}>
//       <color attach="background" args={[0xe2f4df]} />
//       <ambientLight />
//       <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
//       <directionalLight intensity={0.8} position={[-6, 2, 2]} />
//
//       <Suspense>
//         <Environment preset="park" />
//         <IPhone />
//       </Suspense>
//
//       <EffectComposer>
//         <Bloom intensity={1.5} luminanceThreshold={0.9} />
//       </EffectComposer>
//     </Canvas>
//   );
// };
//
// const IPhone = () => {
//   const asset: string = require("@assets/models/iphone.glb");
//   const { scene } = useGLTF(asset);
//   useFrame(() => {
//     scene.rotation.y += 0.01;
//   });
//   return <primitive object={scene} />;
// };
