import {Environment, OrbitControls, useGLTF} from "@react-three/drei/native";
import {Canvas, type Vector3} from "@react-three/fiber/native";
import {Suspense, useState} from "react";
import {Header} from "@/components/general/header";
import {Drawer, DrawerContent} from "@zennui/native/drawer";
import {H1, H3, P} from "@zennui/native/typography";
import {View} from "react-native";
import {Text} from "@zennui/native/text";
import {EditIcon} from "@zennui/icons";
import {Image} from "expo-image";
import {Link, useLocalSearchParams} from "expo-router";
import {Button} from "@zennui/native/button";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useLocalSearchParams<{ id: string }>();
  const id = decodeURIComponent(params.id);
  return (
    <>
      <Header title={"View 3D"} subtitle={id}/>
      <Canvas
        camera={{
          position: [0, 0, -50],
        }}
        gl={{
          antialias: false,
          alpha: true,
          // Disable features that might cause issues in WebGL1
          // powerPreference: "low-power",
          // depth: true,
          // stencil: false,
          debug: {
            checkShaderErrors: true,
            onShaderError: (error) => {
              console.log(error);
            },
          },
        }}
      >
        <ambientLight />
        <directionalLight intensity={1.1} />
        <directionalLight intensity={0.8} />
        <OrbitControls />
        <Suspense>
          <Environment preset="park" />
          <Model />
          <Pin position={[3.5, 9.5, 0]} onClick={() => setIsOpen(true)} />
          <Pin position={[12, 2, -12]} onClick={() => setIsOpen(true)} />
        </Suspense>
      </Canvas>
      <Drawer
        scaleBackground={false}
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        snapAt="35%"
      >
        <DrawerContent className={"px-4 gap-4"}>
          <H1 className="text-primary">Survey Information</H1>
          <View className="flex-row gap-8 justify-between">
            <View className="flex-1">
              <H3 className="3xl">Manifacture</H3>
              <View className="flex-row items-center justify-between gap-2">
                <Text className="text-2xl text-foreground-dimmed">Midea</Text>
                <EditIcon className="text-foreground-dimmed/50  size-6" />
              </View>
            </View>
            <View className="flex-1">
              <H3 className="3xl">Scan ID</H3>
              <View className="flex-row items-center justify-between gap-2">
                <Text className="text-2xl text-foreground-dimmed">
                  S67665834
                </Text>
                <EditIcon className="text-foreground-dimmed/50  size-6" />
              </View>
            </View>
          </View>
          <View className="flex-row gap-8 justify-between">
            <View className="flex-1">
              <H3 className="3xl">Model</H3>
              <View className="flex-row items-center justify-between gap-2">
                <Text className="text-2xl text-foreground-dimmed">
                  Split Type
                </Text>
                <EditIcon className="text-foreground-dimmed/50 size-6" />
              </View>
            </View>
            <View className="flex-1">
              <H3 className="3xl">Weight</H3>
              <View className="flex-row items-center justify-between gap-2">
                <Text className="text-2xl text-foreground-dimmed">80kg</Text>
                <EditIcon className="text-foreground-dimmed/50  size-6" />
              </View>
            </View>
          </View>
          <Image
            source={require("@assets/images/air-conditioner-label.png")}
            className={"w-full h-52 rounded-lg"}
          />
          <Link href={`/survey/${params.id}/expanded`} asChild>
            <Button color={"primary"}>
              <Text>More Info</Text>
            </Button>
          </Link>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Model = () => {
  const asset: string = require("@assets/models/house.glb");

  const { scene } = useGLTF(asset);
  return (
    <primitive
      object={scene}
      rotation={[-0.5, -180, 0]}
      scale={[1.5, 1.5, 1.5]}
    />
  );
};

// Pin component with click interaction
const Pin = ({
  position,
  onClick,
}: { position: Vector3; onClick?: () => void }) => {
  return (
    <group
      scale={[4, 4, 4]}
      rotation={[-0.5, -180, 0]}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {/* Pin head - red sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Pin body - cylinder */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

// import * as WEBIFC from "web-ifc";
// import * as OBC from "@thatopen/components";
//
// const IFCTest = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     (async () => {
//       const components = new OBC.Components();
//
//       const worlds = components.get(OBC.Worlds);
//
//       const world = worlds.create<
//         OBC.SimpleScene,
//         OBC.SimpleCamera,
//         OBC.SimpleRenderer
//       >();
//
//       world.scene = new OBC.SimpleScene(components);
//       world.renderer = new OBC.SimpleRenderer(components, ref.current);
//       world.camera = new OBC.SimpleCamera(components);
//
//       components.init();
//
//       world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
//
//       world.scene.setup();
//
//       const grids = components.get(OBC.Grids);
//       grids.create(world);
//
//       const fragments = components.get(OBC.FragmentsManager);
//       const fragmentIfcLoader = components.get(OBC.IfcLoader);
//       await fragmentIfcLoader.setup();
//
//       async function loadIfc() {
//         const file = await fetch(
//           "https://thatopen.github.io/engine_components/resources/small.ifc",
//         );
//         const data = await file.arrayBuffer();
//         const buffer = new Uint8Array(data);
//         const model = await fragmentIfcLoader.load(buffer);
//         model.name = "example";
//         world.scene.three.add(model);
//       }
//       async function exportFragments() {
//         if (!fragments.groups.size) {
//           return;
//         }
//         const group = Array.from(fragments.groups.values())[0];
//         const data = fragments.export(group);
//         download(new File([new Blob([data])], "small.frag"));
//
//         const properties = group.getLocalProperties();
//         if (properties) {
//           download(new File([JSON.stringify(properties)], "small.json"));
//         }
//       }
//
//       function disposeFragments() {
//         fragments.dispose();
//       }
//     })();
//   }, []);
// };
