import { Text, SafeAreaView, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import { Focus } from "./src/features/focus/focus";
import { colors } from "./src/utils/colors";
import Timer from "./src/features/timer/Timer";
import { spacing } from "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState("gardening");
  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
      <Text>{focusSubject}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.xxl,
  },
});
