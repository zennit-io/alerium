import { Text } from "@zennui/native/text";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Camera as CameraPrimitive,
  type CameraProps as CameraPrimitiveProps,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export const Camera = (props: Partial<CameraPrimitiveProps>) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    (async () => {
      if (hasPermission) return;
      await requestPermission();
    })();
  }, [hasPermission, requestPermission]);

  const device = useCameraDevice("back");

  if (!hasPermission) return <Text>No permission</Text>;
  if (!device) return <Text>No device</Text>;

  return (
    <CameraPrimitive
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      {...props}
    />
  );
};
