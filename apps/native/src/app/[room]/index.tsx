import { Camera } from "@/components/camera/camera";
import { useLocalSearchParams } from "expo-router";
export default () => {
  const { room } = useLocalSearchParams();

  return (
    <>
      <Camera />
    </>
  );
};
