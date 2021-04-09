import React from 'react';
import {
  Image,
  StyleSheet, Text, View,
} from 'react-native';

import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { FacebookButton } from '../components/FacebookButton';
import { TextInput } from '../components/TextInput';
import { TextLink } from '../components/TextLink';

export const SignIn: React.FC = () => (
  <View style={styles.Container}>
    <View
      style={styles.FormContainer}
    >
      <Image source={require('../assets/logo-full.png')} />

      <TextInput
        label="Email"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        type="password"
      />

      <Button
        onPress={() => {
          console.warn('Not implemented');
        }}
        buttonStyle={{
          marginTop: 20,
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
            console.warn('Not implemented');
          }}
        > Criar conta.
        </TextLink>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  Container: { flex: 1, alignItems: 'center', paddingHorizontal: 40 },
  FormContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
