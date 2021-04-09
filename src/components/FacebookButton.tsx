import React from 'react';
import { Image, StyleProp, ViewStyle } from 'react-native';

import { Button } from './Button';

interface FacebookButtonProps {
  type?: 'signin' | 'signup',
  buttonStyle?: StyleProp<ViewStyle>;
}

export const FacebookButton: React.FC<FacebookButtonProps> = ({
  type = 'signin',
  buttonStyle = {},
}) => {
  const { [type]: label } = {
    signin: 'Entrar com o Facebook',
    signup: 'Cadastrar com o Facebook',
  };

  return (
    <Button
      onPress={() => console.warn('Not Implemented')}
      buttonStyle={[buttonStyle, {
        borderWidth: 2,
        borderColor: '#1877F2',
        backgroundColor: '#fff',
      }]}
      labelStyle={{
        color: '#1877F2',
      }}
      icon={<Image style={{ marginRight: 10 }} source={require('../assets/facebok-icon-25x25.png')} />}
    >
      {label}
    </Button>
  );
};
