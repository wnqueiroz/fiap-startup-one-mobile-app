import React from 'react';
import {
  StyleProp,
  StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,
} from 'react-native';

export interface ButtonProps {
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: any // TODO: set correct type,
  isActive?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  buttonStyle = {},
  labelStyle = {},
  icon = null,
  isActive = true,
}) => {
  function handleOnPress(): void {
    if (isActive && onPress) onPress();
  }

  return (
    <TouchableOpacity
      activeOpacity={isActive ? 0.5 : 1}
      onPress={handleOnPress}
      style={[
        styles.Button,
        buttonStyle,
        !isActive && styles.ButtonDisabled,
      ]}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        {icon}
        <Text style={[
          styles.ButtonText,
          labelStyle,
          !isActive && styles.ButtonTextDisabled]}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#FF7675',
    width: 295,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  ButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  ButtonDisabled: {
    backgroundColor: '#EEEEEE',
  },
  ButtonTextDisabled: {
    color: '#BBBBBB',
  },
});
