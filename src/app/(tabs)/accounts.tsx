import KHeader from "@/src/components/common/Header";
import { colors } from "@/src/theme/colors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}
    >
      <KHeader headerText="accounts" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    </SafeAreaView>
  );
}
