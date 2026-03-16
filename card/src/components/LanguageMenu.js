import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export function LanguageMenu({
  currentLanguage,
  isVisible,
  onClose,
  onOpen,
  onSelect,
  options,
}) {
  return (
    <>
      <Pressable onPress={onOpen} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonLabel}>{currentLanguage.toUpperCase()}</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <View style={styles.menu}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => onSelect(option.value)}
                style={({ pressed }) => [
                  styles.option,
                  option.value === currentLanguage && styles.optionActive,
                  pressed && styles.optionPressed,
                ]}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 42,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#27272A',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#3F3F46',
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingTop: 68,
    paddingRight: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  menu: {
    width: 42,
    borderRadius: 14,
    paddingVertical: 6,
    backgroundColor: '#27272A',
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: '#3F3F46',
  },
  optionPressed: {
    opacity: 0.84,
  },
  optionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
