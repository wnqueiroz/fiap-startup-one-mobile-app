import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Header: React.FC = ({ children }) => (
  <View style={styles.Header}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#FF7675',
    height: 110,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
});
