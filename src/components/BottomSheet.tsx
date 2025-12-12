import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { colors } from "../theme/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

type BottomSheetProps = {
  children?: React.ReactNode;
  onClose?: () => void;
};

const BottomSheet = ({ children, onClose }: BottomSheetProps) => {
  // 1. Initial State: Sheet is hidden below the screen (offset = SHEET_HEIGHT)
  const translateY = useSharedValue(SHEET_HEIGHT);
  const opacity = useSharedValue(0);

  // 2. Animate IN on mount
  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.quad), // Smooth decelerate curve
    });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  // 3. Helper to close safely
  const close = useCallback(() => {
    opacity.value = withTiming(0, { duration: 250 });
    translateY.value = withTiming(
      SHEET_HEIGHT,
      { duration: 250 },
      (finished) => {
        if (finished && onClose) {
          runOnJS(onClose)();
        }
      },
    );
  }, [onClose]);

  // 4. Gesture: Drag down to close
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      // Only allow dragging DOWN (positive values)
      translateY.value = Math.max(0, event.translationY + context.value.y);
    })
    .onEnd(() => {
      // If dragged down more than 20% of sheet height, close it
      if (translateY.value > SHEET_HEIGHT * 0.2) {
        runOnJS(close)();
      } else {
        // Otherwise snap back up
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  // 5. Styles
  const rSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const rBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.overlay}>
      {/* Backdrop */}
      <Pressable style={StyleSheet.absoluteFill} onPress={close}>
        <Animated.View style={[styles.backdrop, rBackdropStyle]} />
      </Pressable>

      {/* Sheet Content */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.sheet, rSheetStyle]}>
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    height: SHEET_HEIGHT,
    width: "100%",
    padding: 20,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginVertical: 15,
  },
});

export default BottomSheet;
