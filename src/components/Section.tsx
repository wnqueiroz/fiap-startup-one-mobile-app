import React from 'react';
import { Text, View } from 'react-native';

interface SectionProps {
    title: string
    titleRight?: Element
}

export const Section: React.FC<SectionProps> = ({ title, titleRight = null, children }) => (
  <View>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      justifyContent: 'space-between',
    }}
    >
      <Text style={{
        color: '#292929',
        fontWeight: 'bold',
        fontSize: 19,

      }}
      >
        {title}
      </Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {titleRight}
      </View>
    </View>

    <>
      {children}
    </>
  </View>
);
