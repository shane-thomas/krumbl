import { Tabs, useRouter } from "expo-router";
import {
  ChartColumn,
  CirclePlus,
  Home,
  Landmark,
  Settings,
} from "lucide-react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0060AC",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color }) => <Landmark color={color} />,
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          tabBarIcon: ({ color }) => <CirclePlus color={color} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/add-transaction");
          },
        })}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => <ChartColumn color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
