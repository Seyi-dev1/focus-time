import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import Countdown from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";

const Timer = ({ focusSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown isPaused={!isStarted} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      {isStarted ? (
        <RoundedButton
          title="pause"
          size={50}
          onPress={() => setIsStarted(false)}
        />
      ) : (
        <RoundedButton
          title="start"
          size={50}
          onPress={() => setIsStarted(true)}
        />
      )}
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  countDown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
