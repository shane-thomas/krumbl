import { Text, StyleSheet } from "react-native";

type KHeaderProps = {
  headerText: string;
};

export default function KHeader({ headerText }: KHeaderProps) {
  return <Text style={styles.header}>{headerText}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Futura-Bold",
    fontSize: 30,
    textAlign: "left",
    color: "#0060AC",
    width: "100%",
  },
});
