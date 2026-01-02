import CategorySmall from "@/src/components/common/CategorySmall";
import KHeader from "@/src/components/common/Header";
import { colors } from "@/src/theme/colors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}
    >
      <KHeader headerText="plan" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CategorySmall assigned={50} spent={25} target={100} title="Test1" />
        <CategorySmall assigned={70} spent={60} target={200} title="Test2" />
      </View>
    </SafeAreaView>
  );
}
