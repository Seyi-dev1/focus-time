import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes = 25, isPaused }) => {
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // do more stuff here later
        return time;
      }
      const timeLeft = time - 1000;
      // report the progress
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
