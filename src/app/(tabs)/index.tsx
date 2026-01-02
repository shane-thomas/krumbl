import CategorySmall from "@/src/components/common/CategorySmall";
import KHeader from "@/src/components/common/Header";
import { colors } from "@/src/theme/colors";
import { ChevronDown, Edit } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Index() {
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex].toLowerCase();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}
    >
      <KHeader headerText="plan" />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}>{currentMonth}</Text>
          <ChevronDown color={colors.primary} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}>Edit </Text>
          <Edit color={colors.primary} />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CategorySmall assigned={50} spent={25} target={100} title="test1" />
        <CategorySmall assigned={100} spent={80} target={200} title="test2" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Futura",
    color: colors.primary,
    fontSize: 18,
  },
});
