import React from 'react';
import {
  StyleProp,
  Text, TextStyle, TouchableOpacity, View, ViewStyle,
} from 'react-native';

export interface ButtonProps {
  onPress: () => void;
  customButtonStyle?: StyleProp<ViewStyle>;
  customLabelStyle?: StyleProp<TextStyle>;
  icon?: any // TODO: set correct type,
  type?: ButtonTypes
}

type ButtonTypes = 'default' | 'disabled' | 'outline'

type ButtonStyles = { [key in ButtonTypes]: StyleProp<ViewStyle> };
type LabelStyles = { [key in ButtonTypes]: StyleProp<TextStyle> };

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  customButtonStyle = {},
  customLabelStyle = {},
  icon = null,
  type = 'default',
}) => {
  const isActive = type !== 'disabled';

  function handleOnPress(): void {
    if (isActive && onPress) onPress();
  }

  const buttonDefaultStyles: StyleProp<ViewStyle> = {
    width: 295,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  };

  const labelDefaultStyles: StyleProp<TextStyle> = {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  const { [type]: buttonStyles }: ButtonStyles = {
    default: {
      backgroundColor: '#FF7675',
    },
    outline: {
      borderWidth: 1,
      borderColor: '#FF7675',
      backgroundColor: '#FFF',
    },
    disabled: {
      backgroundColor: '#EEEEEE',
    },
  };

  const { [type]: labelStyles }: LabelStyles = {
    default: {
      color: '#FFF',
    },
    outline: {
      color: '#FF7675',
    },
    disabled: {
      color: '#BBBBBB',
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={isActive ? 0.5 : 1}
      onPress={handleOnPress}
      style={[
        buttonDefaultStyles,
        buttonStyles,
        customButtonStyle,
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
          labelDefaultStyles,
          labelStyles,
          customLabelStyle,
        ]}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
