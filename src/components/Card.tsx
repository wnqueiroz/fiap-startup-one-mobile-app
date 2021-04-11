import React from 'react';
import { Text, View } from 'react-native';

interface CardProps {
    title: string
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <View style={{
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexGrow: 1,
  }}
  >
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
      marginBottom: 20,
    }}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      >{title}
      </Text>
      <View style={{
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      />
    </View>
    {children}
  </View>
);
