import React, { useState } from 'react';
import {
  Image,
  StyleSheet, Text, View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { FacebookButton } from '../components/FacebookButton';
import { TextInput } from '../components/TextInput';
import { TextLink } from '../components/TextLink';
import { SCREENS } from '../contants';
import { useAuth } from '../contexts/auth';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(): Promise<void> {
    await signIn({
      email,
      password,
    });
  }

  return (
    <View style={styles.Container}>
      <View
        style={styles.FormContainer}
      >
        <Image source={require('../assets/logo-full.png')} />

        <TextInput
          label="Email"
          keyboardType="email-address"
          onChangeText={(newValue) => {
            setEmail(newValue);
          }}
        />
        <TextInput
          label="Senha"
          type="password"
          onChangeText={(newValue) => {
            setPassword(newValue);
          }}
        />

        <Button
          onPress={handleSignIn}
          customButtonStyle={{
            marginVertical: 20,
          }}
        >
          Entrar
        </Button>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TextLink
          wrapperStyle={{
            marginBottom: 20,
          }}
          onPress={() => {
            console.warn('Not implemented');
          }}
        >Esqueci minha senha
        </TextLink>

        <Divider>ou</Divider>

        <FacebookButton
          type="signin"
          buttonStyle={{
            marginBottom: 67,
          }}
        />

        <View style={{
          flexDirection: 'row',
        }}
        >
          <Text style={{
            fontSize: 12,
          }}
          >Sou novo por aqui.
          </Text>
          <TextLink
            wrapperStyle={{
              marginBottom: 0,
            }}
            onPress={() => {
              navigation.navigate(SCREENS.SIGN_UP);
            }}
          > Criar conta.
          </TextLink>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: { flex: 1, alignItems: 'center', paddingHorizontal: 40 },
  FormContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
