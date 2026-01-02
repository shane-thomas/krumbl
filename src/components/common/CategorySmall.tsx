import { StyleSheet, View, Text } from "react-native";
import { colors } from "@/src/theme/colors";
import { ChevronRight } from "lucide-react-native";

type CategorySmallProps = {
  title: string;
  target: number;
  assigned: number;
  spent: number;
};

export default function CategorySmall({
  title,
  target,
  assigned,
  spent,
}: CategorySmallProps) {
  const assignedPercent = target > 0 ? (assigned / target) * 100 : 0;
  const spentPercent = target > 0 ? (spent / target) * 100 : 0;
  const overspent = spent > assigned;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingRight: 20,
        }}
      >
        <Text style={styles.header}>{title}</Text>
        <ChevronRight color={colors.primary} />
      </View>
      <View style={styles.box}>
        <View style={styles.targetLine} />
        <View
          style={[
            styles.assignedLine,
            {
              width: `${assignedPercent}%`,
              backgroundColor: overspent ? "red" : "green",
            },
          ]}
        />
        <View
          style={[
            styles.spentLine,
            {
              width: `${spentPercent}%`,
              backgroundColor: overspent ? "transparent" : "white",
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.background,
    marginBottom: 5,
  },
  header: {
    fontFamily: "Futura",
    fontSize: 16,
    textAlign: "left",
    color: colors.primary,
    width: "100%",
  },
  box: {
    width: "100%",
    height: 6,
    position: "relative",
  },
  targetLine: {
    position: "absolute",
    backgroundColor: colors.background,
    height: 6,
    width: "100%",
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 1,
    borderWidth: 0.2,
    borderColor: "grey",
  },
  assignedLine: {
    position: "absolute",
    backgroundColor: "green",
    height: 6,
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 2,
  },
  spentLine: {
    position: "absolute",
    backgroundColor: "white",
    opacity: 0.3,
    height: 6,
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 3,
  },
});
