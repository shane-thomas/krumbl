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
        tabBarStyle: {
          backgroundColor: "#EFF6FF",
          height: 100,
          borderTopWidth: 0,
          paddingVertical: 0,
          // shadowColor: "transparent",
        },
        tabBarItemStyle: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        tabBarIconStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: 0,
          paddingBottom: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "plan",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "accounts",
          tabBarIcon: ({ color }) => <Landmark color={color} />,
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          title: "add",
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
          title: "transactions",
          tabBarIcon: ({ color }) => <ChartColumn color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
