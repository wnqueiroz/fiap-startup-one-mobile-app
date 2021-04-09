import React from 'react';
import {
  StyleSheet,
  Text, View,
} from 'react-native';

export const Divider: React.FC = ({ children }) => (
  <View style={{ flexDirection: 'row', marginBottom: 20, maxWidth: 295 }}>
    <View
      style={styles.Line}
    />
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.Text}>{children}</Text>
    </View>
    <View
      style={styles.Line}
    />
  </View>
);

const styles = StyleSheet.create({
  Line: {
    flex: 1,
    borderWidth: 0.4,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  Text: {
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 10,
  },
});
