import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import BottomSheet from "../components/BottomSheet";
// import KHeader from "../components/common/Header";

export default function AddTransaction() {
  const router = useRouter();

  return (
    // Pass router.back as the onClose prop
    <BottomSheet onClose={() => router.back()}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Calculator</Text>
        <Text>Your custom calculator UI goes here..</Text>
      </View>
    </BottomSheet>
  );
}
