import { useRouter } from "expo-router";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import BottomSheet from "../components/BottomSheet";
import { Banknote, ChevronDown, Delete } from "lucide-react-native";
import { useState } from "react";

export default function AddTransaction() {
  const router = useRouter();

  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    if (previousNumber !== null) {
    } else {
      if (currentNumber === "0") {
        setCurrentNumber(num);
      } else {
        setCurrentNumber(currentNumber + num);
      }
    }
  };
  return (
    <BottomSheet onClose={() => router.back()}>
      {/* Header Buttons */}
      <View style={styles.header}>
        <Pressable onPress={() => {}} style={styles.headerButton}>
          <Banknote color="#000" size={20} />
          <Text style={styles.headerButtonText}>Cash</Text>
          <ChevronDown color="#666" size={16} />
        </Pressable>
        <Pressable onPress={() => {}} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Groceries</Text>
          <ChevronDown color="#666" size={16} />
        </Pressable>
      </View>

      {/* Input Display */}
      <View style={styles.inputContainer}>
        <Text style={[styles.amountText, { fontSize: 32, color: "#888" }]}>
          ₹
        </Text>
        <Text style={styles.amountText}>{currentNumber}</Text>
      </View>

      <TextInput
        placeholder="Add a note..."
        style={styles.commentInput}
        placeholderTextColor="#999"
      />

      {/* Calculator Grid */}
      <View style={styles.calculatorGrid}>
        {/* Row 1 */}
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleNumber("7");
            }}
          >
            <Text style={styles.numberText}>7</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("8")}>
            <Text style={styles.numberText}>8</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("9")}>
            <Text style={styles.numberText}>9</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {}}
          >
            <Text style={styles.operatorText}>×</Text>
          </Pressable>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handleNumber("4")}>
            <Text style={styles.numberText}>4</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("5")}>
            <Text style={styles.numberText}>5</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("6")}>
            <Text style={styles.numberText}>6</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {}}
          >
            <Text style={styles.operatorText}>÷</Text>
          </Pressable>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => handleNumber("1")}>
            <Text style={styles.numberText}>1</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("2")}>
            <Text style={styles.numberText}>2</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("3")}>
            <Text style={styles.numberText}>3</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {}}
          >
            <Text style={styles.operatorText}>+</Text>
          </Pressable>
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.accentButton]}
            onPress={() => {}}
          >
            <Text style={[styles.numberText, { color: "white" }]}>=</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("0")}>
            <Text style={styles.numberText}>0</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              const newNumber = currentNumber.slice(0, -1);
              if (currentNumber.slice(0, -1) === "") setCurrentNumber("0");
              else setCurrentNumber(newNumber);
            }}
          >
            <Delete color="#000" size={24} />
          </Pressable>
          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {}}
          >
            <Text style={styles.operatorText}>−</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  headerButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: "#f5f5f5", // Light grey instead of border
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  headerButtonText: {
    fontFamily: "Futura",
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: 10,
  },
  amountText: {
    fontFamily: "Futura-Bold",
    fontSize: 48,
    color: "#000",
  },
  commentInput: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginBottom: 25,
    fontFamily: "Futura",
  },
  /* --- Calculator Grid Styling --- */
  calculatorGrid: {
    gap: 12, // Consistent vertical spacing between rows
  },
  row: {
    flexDirection: "row",
    gap: 12, // Consistent horizontal spacing between buttons
    height: 65, // Fixed height for uniformity
  },
  button: {
    flex: 1, // Ensures all buttons share width equally
    backgroundColor: "#f2f2f2", // Soft gray for numbers
    borderRadius: 24, // Rounded corners ("Squircle" look)
    justifyContent: "center",
    alignItems: "center",
  },
  operatorButton: {
    backgroundColor: "#e0e0e0",
  },
  accentButton: {
    backgroundColor: "#007AFF",
  },
  numberText: {
    fontSize: 28,
    fontFamily: "Futura",
    color: "#000",
  },
  operatorText: {
    fontSize: 32,
    fontFamily: "Futura",
    color: "#555",
    lineHeight: 36, // Adjusts vertical alignment of symbols
  },
});
