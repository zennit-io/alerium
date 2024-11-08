// import {
//   initLicense,
//   recognize,
// } from "vision-camera-dynamsoft-label-recognizer";
// import { runAtTargetFps, useFrameProcessor } from "react-native-vision-camera";
// import { Camera } from "@/components/camera/camera";

// initLicense(process.env.EXPO_PUBLIC_DYNAMOSOFT_KEY);

// export default () => {
//   const frameProcessor = useFrameProcessor((frame) => {
//     "worklet";
//     runAtTargetFps(1, () => {
//       "worklet";
//       const result = recognize(frame, {
//         scanRegion: {
//           left: 0,
//           top: 0,
//           width: 100,
//           height: 100,
//         },
//       });
//       console.log(JSON.stringify(result.results[0] ?? ""));
//     });
//   }, []);

//   return <Camera frameProcessor={frameProcessor} />;
// };
// //
// // import { View } from "react-native";
// //
// // export default () => <View />;
