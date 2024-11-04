import * as Location from "expo-location";
import { useEffect } from "react";

type UseBackgroundPermissionsParams = {
  foregroundPermission?: boolean;
  backgroundPermission?: boolean;
};

export const useLocationPermissions = ({
  foregroundPermission = true,
  backgroundPermission = true,
}: UseBackgroundPermissionsParams = {}) => {
  const [foregroundPermissionsStatus, requestForegroundPermission] =
    Location.useForegroundPermissions();
  const [backgroundPermissionsStatus, requestBackgroundPermission] =
    Location.useBackgroundPermissions();

  const areForegroundPermissionGranted =
    foregroundPermission && foregroundPermissionsStatus?.granted;
  const areBackgroundPermissionsGranted =
    backgroundPermission && backgroundPermissionsStatus?.granted;

  // biome-ignore lint/correctness/useExhaustiveDependencies: we only want to request permissions on mount, if they aren't granted
  useEffect(() => {
    (async () => {
      if (foregroundPermission && !areForegroundPermissionGranted) {
        await requestForegroundPermission();
      }
      if (backgroundPermission && !areBackgroundPermissionsGranted) {
        await requestBackgroundPermission();
      }
    })();
  }, []);

  return {
    areForegroundPermissionGranted,
    areBackgroundPermissionsGranted,
  };
};
