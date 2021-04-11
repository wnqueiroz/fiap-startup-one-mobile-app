import React from 'react';
import { Text, View } from 'react-native';

interface SectionProps {
    title: string
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View>
    <Text style={{
      color: '#292929',
      fontWeight: 'bold',
      fontSize: 19,
      marginBottom: 15,
    }}
    >
      {title}
    </Text>
    <>
      {children}
    </>
  </View>
);
