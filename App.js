import { Text, SafeAreaView, StyleSheet, Platform, View } from "react-native";
import React, { useState } from "react";
import { Focus } from "./src/features/focus/focus";
import { colors } from "./src/utils/colors";
import Timer from "./src/features/timer/Timer";
import { spacing } from "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState("gardening");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topnav}></View>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.xxl,
    position: "relative",
  },
  topnav: {
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    flex: 1,
    top: 0,
    left: 0,
  },
});
