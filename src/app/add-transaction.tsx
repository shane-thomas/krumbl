import { useRouter } from "expo-router";
import {
  Banknote,
  Calendar,
  Check,
  ChevronDown,
  Delete,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import BottomSheet from "../components/BottomSheet";
import { colors } from "../theme/colors";

type ButtonProps = {
  val: string;
};

export default function AddTransaction() {
  const router = useRouter();

  const [currentNumber, setCurrentNumber] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);

  // Safe calculation without eval()
  const safeCalculate = (expression: string): number => {
    // Replace display operators with standard ones
    const equation = expression.replaceAll("÷", "/").replaceAll("x", "*");

    // Parse the expression into tokens (numbers and operators)
    const tokens: (number | string)[] = [];
    let currentNum = "";

    for (let i = 0; i < equation.length; i++) {
      const char = equation[i];
      if (["+", "-", "*", "/"].includes(char)) {
        if (currentNum) {
          tokens.push(parseFloat(currentNum));
          currentNum = "";
        }
        tokens.push(char);
      } else {
        currentNum += char;
      }
    }
    if (currentNum) {
      tokens.push(parseFloat(currentNum));
    }

    // Handle multiplication and division first (order of operations)
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      if (operator === "*" || operator === "/") {
        const left = tokens[i - 1] as number;
        const right = tokens[i + 1] as number;

        let result: number;
        if (operator === "*") {
          result = left * right;
        } else {
          // Handle division by zero
          if (right === 0) {
            return NaN;
          }
          result = left / right;
        }

        // Replace the three tokens with the result
        tokens.splice(i - 1, 3, result);
        i -= 2; // Adjust index after splice
      }
    }

    // Handle addition and subtraction
    let result = tokens[0] as number;
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = tokens[i + 1] as number;

      if (operator === "+") {
        result += operand;
      } else if (operator === "-") {
        result -= operand;
      }
    }

    return result;
  };

  const formatResult = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) {
      return "error";
    }
    // Remove unnecessary decimals
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  const handleNumber = (num: string) => {
    const segments = currentNumber.split(/[+\-x÷]/);
    const currentSegment = segments[segments.length - 1];

    if (currentSegment.includes(".")) {
      const decimalIndex = currentSegment.indexOf(".");
      const digitsAfterDecimal = currentSegment.length - decimalIndex - 1;

      if (digitsAfterDecimal >= 2) return;
    }

    if (currentNumber === "0") {
      setCurrentNumber(num);
    } else {
      if (currentNumber.length < 10) {
        setCurrentNumber(currentNumber + num);
        setOperator(null);
      }
    }
  };

  const NumberButton = ({ val: number }: ButtonProps) => {
    return (
      <Pressable style={styles.button} onPress={() => handleNumber(number)}>
        <Text style={styles.numberText}>{number}</Text>
      </Pressable>
    );
  };

  const handleOperator = (op: string) => {
    if (op === "=") {
      const result = safeCalculate(currentNumber);
      setCurrentNumber(formatResult(result));
      return;
    }

    if (operator === op) {
      setOperator(null);
      setCurrentNumber(currentNumber.slice(0, -1));
      return;
    }
    const last = currentNumber.slice(-1);
    let next = currentNumber;

    if (["+", "-", "x", "÷"].includes(last)) {
      next = currentNumber.slice(0, -1);
    }

    next = next + op;
    setOperator(op);
    setCurrentNumber(next);
  };

  const handleDecimal = () => {
    const segments = currentNumber.split(/[+\-x÷]/);
    const currentSegment = segments[segments.length - 1];

    if (currentSegment.includes(".")) return;

    setCurrentNumber(currentNumber + ".");
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
        <Text
          style={[
            styles.amountText,
            { fontSize: 26, color: "#888", opacity: 0.7 },
          ]}
        >
          ₹
        </Text>
        <Text style={styles.amountText} numberOfLines={1} ellipsizeMode="clip">
          {currentNumber}
        </Text>
      </View>

      <TextInput
        placeholder="Memo"
        numberOfLines={2}
        style={styles.commentInput}
        placeholderTextColor="#999"
      />

      {/* Calculator Grid */}
      <View style={styles.calculatorGrid}>
        {/* Row 1 */}
        <View style={styles.row}>
          <Pressable
            style={[
              styles.button,
              styles.operatorButton,
              {
                backgroundColor: operator === "x" ? colors.primary : "#e0e0e0",
              },
            ]}
            onPress={() => handleOperator("x")}
          >
            <Text
              style={[
                styles.operatorText,
                { color: operator === "x" ? "white" : "#555" },
              ]}
            >
              x
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              styles.operatorButton,
              {
                backgroundColor: operator === "÷" ? colors.primary : "#e0e0e0",
              },
            ]}
            onPress={() => handleOperator("÷")}
          >
            <Text
              style={[
                styles.operatorText,
                { color: operator === "÷" ? "white" : "#555" },
              ]}
            >
              ÷
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              styles.operatorButton,
              {
                backgroundColor: operator === "+" ? colors.primary : "#e0e0e0",
              },
            ]}
            onPress={() => handleOperator("+")}
          >
            <Text
              style={[
                styles.operatorText,
                { color: operator === "+" ? "white" : "#555" },
              ]}
            >
              +
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              styles.operatorButton,
              {
                backgroundColor: operator === "-" ? colors.primary : "#e0e0e0",
              },
            ]}
            onPress={() => handleOperator("-")}
          >
            <Text
              style={[
                styles.operatorText,
                { color: operator === "-" ? "white" : "#555" },
              ]}
            >
              -
            </Text>
          </Pressable>
        </View>

        {/*Row 2*/}
        <View style={styles.row}>
          <NumberButton val="7" />
          <NumberButton val="8" />
          <NumberButton val="9" />

          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => handleOperator("=")}
          >
            <Text style={styles.numberText}>=</Text>
          </Pressable>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <NumberButton val="4" />
          <NumberButton val="5" />
          <NumberButton val="6" />

          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {}}
          >
            <Calendar color="#000" size={24} />
          </Pressable>
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <NumberButton val="1" />
          <NumberButton val="2" />
          <NumberButton val="3" />

          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {
              const newNumber = currentNumber.slice(0, -1);
              if (currentNumber.slice(0, -1) === "") setCurrentNumber("0");
              else setCurrentNumber(newNumber);
              if (operator !== null) setOperator(null);
            }}
          >
            <Delete color="#000" size={24} />
          </Pressable>
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <Pressable style={[styles.button]} onPress={() => handleDecimal()}>
            <Text style={[styles.numberText]}>.</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleNumber("0")}>
            <Text style={styles.numberText}>0</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setCurrentNumber("0");
              setOperator(null);
            }}
          >
            <Text style={styles.numberText}>AC</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.operatorButton]}
            onPress={() => {}}
          >
            <Check color="#000" size={24} />
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
    backgroundColor: "#f5f5f5",
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
    maxHeight: 40,
  },
  calculatorGrid: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    height: 65,
  },
  button: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  operatorButton: {
    backgroundColor: "#e0e0e0",
  },
  accentButton: {
    backgroundColor: colors.primary,
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
    lineHeight: 36,
  },
});
