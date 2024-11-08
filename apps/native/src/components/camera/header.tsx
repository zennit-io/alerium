import {View} from "react-native";

export const Header = () => {
  const {top} = useSafeAreaInsets();
  return <View className={"absolute p-6 top-0 inset-x-0"}></View>;
};
