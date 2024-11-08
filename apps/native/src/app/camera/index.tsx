import { Camera } from "@/components/camera/camera";
import { useSkiaFrameProcessor } from "react-native-vision-camera";
import {
  ColorConversionCodes,
  ContourApproximationModes,
  DataTypes,
  ObjectType,
  OpenCV,
  RetrievalModes,
  type Rect,
} from "react-native-fast-opencv";
import { useResizePlugin } from "vision-camera-resize-plugin";
import { Skia, PaintStyle } from "@shopify/react-native-skia";

const paint = Skia.Paint();
paint.setStyle(PaintStyle.Fill);
paint.setColor(Skia.Color("lime"));

export default () => {
  const { resize } = useResizePlugin();
  const frameProcessor = useSkiaFrameProcessor((frame) => {
    "worklet";
    const height = frame.height / 4;
    const width = frame.width / 4;

    const resized = resize(frame, {
      scale: {
        width: width,
        height: height,
      },
      pixelFormat: "bgr",
      dataType: "uint8",
    });

    const src = OpenCV.frameBufferToMat(height, width, resized);
    const dst = OpenCV.createObject(ObjectType.Mat, 0, 0, DataTypes.CV_8U);

    const lowerBound = OpenCV.createObject(ObjectType.Scalar, 30, 60, 60);
    const upperBound = OpenCV.createObject(ObjectType.Scalar, 50, 255, 255);
    OpenCV.invoke("cvtColor", src, dst, ColorConversionCodes.COLOR_BGR2HSV);
    OpenCV.invoke("inRange", dst, lowerBound, upperBound, dst);

    const channels = OpenCV.createObject(ObjectType.MatVector);
    OpenCV.invoke("split", dst, channels);
    const grayChannel = OpenCV.copyObjectFromVector(channels, 0);

    const contours = OpenCV.createObject(ObjectType.MatVector);
    OpenCV.invoke(
      "findContours",
      grayChannel,
      contours,
      RetrievalModes.RETR_TREE,
      ContourApproximationModes.CHAIN_APPROX_SIMPLE,
    );

    const contoursMats = OpenCV.toJSValue(contours);
    const rectangles: Rect[] = [];

    for (let i = 0; i < contoursMats.array.length; i++) {
      const contour = OpenCV.copyObjectFromVector(contours, i);
      const { value: area } = OpenCV.invoke("contourArea", contour, false);

      if (area > 3000) {
        const rect = OpenCV.invoke("boundingRect", contour);
        rectangles.push(rect);
      }
    }

    frame.render();

    for (const rect of rectangles) {
      const rectangle = OpenCV.toJSValue(rect);

      frame.drawRect(
        {
          height: rectangle.height * 4,
          width: rectangle.width * 4,
          x: rectangle.x * 4,
          y: rectangle.y * 4,
        },
        paint,
      );
    }

    OpenCV.clearBuffers(); // REMEMBER TO CLEAN
  }, []);
  return <Camera frameProcessor={frameProcessor} />;
};
