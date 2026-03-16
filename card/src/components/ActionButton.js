import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export function ActionButton({
  backgroundColor,
  label,
  onPress,
  pressedColor,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? pressedColor : backgroundColor },
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
