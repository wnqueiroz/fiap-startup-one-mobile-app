import React from 'react';
import {
  StyleProp,
  StyleSheet, Text, TouchableOpacity, ViewStyle,
} from 'react-native';

interface TextLinkProps {
  onPress: () => void;
  children: string;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export const TextLink: React.FC<TextLinkProps> = ({ onPress, children, wrapperStyle }) => (
  <TouchableOpacity
    style={wrapperStyle}
    onPress={onPress}
  >
    <Text style={styles.TextLink}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  TextLink: {
    fontSize: 12,
    color: '#FF7675',
    fontWeight: 'bold',
  },
});
