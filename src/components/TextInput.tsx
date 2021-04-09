import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as BaseTextInput,
  View,
  KeyboardType,
} from 'react-native';

interface TextInputProps {
  label: string;
  initialValue?: string;
  onChangeText?: (value: string) => void;
  type?: 'text' | 'password';
  keyboardType?: KeyboardType;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  initialValue,
  onChangeText,
  type = 'text',
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  const [value, setValue] = useState(initialValue || '');
  const [isFocused, setIsFocused] = useState(false);

  let textInputStyles = [styles.TextInput] as any;

  if (isFocused) {
    textInputStyles.push(styles.TextInputFocused);
  } else {
    textInputStyles = [styles.TextInput];
  }

  return (
    <View>
      <Text style={styles.TextInputLabel}>{label}</Text>
      <BaseTextInput
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCompleteType="off"
        autoCorrect={false}
        style={textInputStyles}
        value={value}
        secureTextEntry={type === 'password'}
        onChangeText={(newValue) => {
          setValue(newValue);

          if (onChangeText) onChangeText(newValue);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputLabel: {
    marginBottom: 5,
  },
  TextInput: {
    borderRadius: 5,
    width: 295,
    maxWidth: 295,
    height: 44,
    fontSize: 16,
    lineHeight: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  TextInputFocused: {
    borderWidth: 1,
    borderColor: '#FF7675',
  },
});
