import { StyleSheet, View, Text } from "react-native";
import { colors } from "@/src/theme/colors";

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.box}>
        <View style={styles.targetLine}></View>
        <View
          style={[styles.assignedLine, { width: `${assignedPercent}%` }]}
        ></View>
        <View style={[styles.spentLine, { width: `${spentPercent}%` }]}></View>
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
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 5,
  },
  header: {
    fontFamily: "Futura-Bold",
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
    borderColor: "black",
    borderWidth: 1,
  },
  assignedLine: {
    position: "absolute",
    backgroundColor: "green",
    height: 6,
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  spentLine: {
    position: "absolute",
    backgroundColor: "red",
    height: 6,
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 3,
    borderColor: "black",
    borderWidth: 1,
  },
});
