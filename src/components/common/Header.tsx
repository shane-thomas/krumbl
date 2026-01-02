import { Text, StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

type KHeaderProps = {
  headerText: string;
};

export default function KHeader({ headerText }: KHeaderProps) {
  return <Text style={styles.header}>{headerText}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Futura-Bold",
    fontSize: 24,
    textAlign: "left",
    color: colors.primary,
    width: "100%",
  },
});
