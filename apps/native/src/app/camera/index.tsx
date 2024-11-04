import { StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Text } from "@zennui/native/text";
import { useEffect } from "react";

export default () => {
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
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};
