import CategorySmall from "@/src/components/common/CategorySmall";
import KHeader from "@/src/components/common/Header";
import { colors } from "@/src/theme/colors";
import { ChevronDown, Edit } from "lucide-react-native";
import { View, Text, StyleSheet, SectionList } from "react-native";
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

// TypeScript interfaces
interface Category {
  id: string;
  title: string;
  assigned: number;
  spent: number;
  target: number;
}

interface CategoryGroup {
  title: string;
  data: Category[];
}

// Mock data
const mockCategoryGroups: CategoryGroup[] = [
  {
    title: "Essential Expenses",
    data: [
      { id: "1-1", title: "Rent", assigned: 1000, spent: 1000, target: 1000 },
      { id: "1-2", title: "Groceries", assigned: 400, spent: 250, target: 500 },
      { id: "1-3", title: "Utilities", assigned: 150, spent: 120, target: 150 },
    ],
  },
  {
    title: "Transportation",
    data: [
      { id: "2-1", title: "Gas", assigned: 200, spent: 180, target: 200 },
      {
        id: "2-2",
        title: "Car Insurance",
        assigned: 120,
        spent: 120,
        target: 120,
      },
      {
        id: "2-3",
        title: "Public Transit",
        assigned: 80,
        spent: 45,
        target: 80,
      },
    ],
  },
  {
    title: "Entertainment",
    data: [
      {
        id: "3-1",
        title: "Dining Out",
        assigned: 300,
        spent: 275,
        target: 300,
      },
      { id: "3-2", title: "Streaming", assigned: 50, spent: 50, target: 50 },
      { id: "3-3", title: "Hobbies", assigned: 100, spent: 60, target: 150 },
    ],
  },
  {
    title: "Savings",
    data: [
      {
        id: "4-1",
        title: "Emergency Fund",
        assigned: 500,
        spent: 500,
        target: 500,
      },
      {
        id: "4-2",
        title: "Investments",
        assigned: 300,
        spent: 300,
        target: 300,
      },
    ],
  },
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

      <SectionList
        sections={mockCategoryGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategorySmall
            assigned={item.assigned}
            spent={item.spent}
            target={item.target}
            title={item.title}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.groupHeader}>{title}</Text>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Futura",
    color: colors.primary,
    fontSize: 18,
  },
  groupHeader: {
    fontFamily: "Futura",
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
});
