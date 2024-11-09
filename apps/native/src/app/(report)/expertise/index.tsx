import {Header} from "@/components/general/header";
import {MicIcon, XIcon} from "@zennui/icons";
import {Button} from "@zennui/native/button";
import {Text} from "@zennui/native/text";
import {Link} from "expo-router";
import {ExpoSpeechRecognitionModule, useSpeechRecognitionEvent,} from "expo-speech-recognition";
import {useEffect, useState} from "react";
import {Pressable, View} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useScannedInfo} from "@/components/providers/scanned-info";
import {H3} from "@zennui/native/typography";

export default () => {
  const { top, bottom } = useSafeAreaInsets();
  const size = useSharedValue(60);
  const [isListening, setIsListening] = useState(false);
  const [output, setOutput] = useScannedInfo();

  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("result", (event) => {
    const content = event.results[0]?.transcript;

    if (!content) return;
    setOutput((previousState = {}) => ({
      ...previousState,
      voiceValue: content,
    }));
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: true,
      contextualStrings: ["AI", "Kone", "Grunlund"],
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: size is a stable value
  useEffect(() => {
    size.value = withRepeat(withTiming(90, { duration: 1000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      opacity: interpolate(size.value, [60, 80, 90], [1, 0.7, 0]),
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      width: interpolate(size.value, [60, 90], [60, 110]),
      height: interpolate(size.value, [60, 90], [60, 110]),
      opacity: interpolate(size.value, [60, 90], [1, 0]),
    };
  });

  return (
    <>
      <Header title="Add Expertise" />
      <View
        className="flex-1 px-6"
        style={{
          paddingTop: top + 60,
        }}
      >
        <Text className="text-2xl font-medium">
          {output?.voiceValue ?? "No Expertise..."}
        </Text>
        <View className="gap-8 flex-1 mb-32" style={{ bottom }}>
          <View className="items-center justify-center mt-auto">
            {isListening && (
              <>
                <Animated.View
                  style={animatedStyle}
                  className="absolute bg-primary/10 rounded-full"
                />
                <Animated.View
                  style={animatedStyle2}
                  className="bg-primary/20 absolute rounded-full"
                />
              </>
            )}
            {/* <Pressable
              onPress={() => {
                setIsListening(!isListening);
              }}
              className="bg-primary/40 p-3 rounded-full border-primary/50 border"
            >
              {isListening ? (
                <XIcon className="text-primary size-10" />
              ) : (
                <MicIcon className="text-primary size-10" />
              )}
            </Pressable> */}
            {isListening ? (
              <Pressable
                onPress={() => {
                  ExpoSpeechRecognitionModule.stop();
                  setIsListening(!isListening);
                }}
                className="bg-primary/40 p-3 rounded-full border-primary/50 border"
              >
                <XIcon className="text-primary size-10" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  handleStart();
                  setIsListening(!isListening);
                }}
                className="bg-primary/40 p-3 rounded-full border-primary/50 border"
              >
                <MicIcon className="text-primary size-10" />
              </Pressable>
            )}
          </View>
        </View>
        <Link href={"/details"} asChild>
          <Button
            color={"primary"}
            className="absolute self-center mb-6 w-full"
            style={{ bottom }}
          >
            <H3 className={"text-white text-2xl font-normal"}>Continue</H3>
          </Button>
        </Link>
      </View>
    </>
  );
};
