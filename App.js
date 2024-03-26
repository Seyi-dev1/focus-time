import { Text, SafeAreaView, StyleSheet, Platform, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Focus } from "./src/features/focus/focus";
import { colors } from "./src/utils/colors";
import Timer from "./src/features/timer/Timer";
import { fontSizes, spacing } from "./src/utils/sizes";
import FocusHistory from "./src/features/focus/FocusHistory";

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState("");
  const [focusHistory, setFocusHistoy] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistoy([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    setFocusHistoy([]);
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistoy(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Focus Time</Text>
      </View>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.xxxl,
  },
  header: {
    color: colors.white,
    fontSize: fontSizes.xl,
    textAlign: "center",
    fontWeight: "900",
  },
});
