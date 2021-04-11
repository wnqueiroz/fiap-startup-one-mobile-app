import React from 'react';
import {
  StyleProp, Text, View, ViewStyle,
} from 'react-native';

interface CardProps {
    title: string
    cardStyles?: StyleProp<ViewStyle>
}

export const Card: React.FC<CardProps> = ({ title, children, cardStyles }) => (
  <View style={[{
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexGrow: 1,
  }, cardStyles]}
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
