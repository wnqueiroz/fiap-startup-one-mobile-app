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
}

export const Button: React.FC<ButtonProps> = ({
  onPress, children, buttonStyle = {}, labelStyle = {}, icon = null,
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    style={[styles.Button, buttonStyle]}
  >
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      {icon}
      <Text style={[styles.ButtonText, labelStyle]}>
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#FF7675',
    width: 295,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  ButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
