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

export const SignUp: React.FC = () => (
  <View style={styles.Container}>
    <View
      style={styles.FormContainer}
    >
      <Image source={require('../assets/logo-full.png')} />

      <TextInput
        label="Nome"
        autoCapitalize="words"
      />
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
        Cadastrar
      </Button>
    </View>

    <View style={{ alignItems: 'center' }}>

      <Divider>ou</Divider>

      <FacebookButton
        type="signup"
        buttonStyle={{
          marginBottom: 20,
        }}
      />

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
      }}
      >
        <Text style={{
          fontSize: 12,
        }}
        >Ao se cadastrar, você aceita os
        </Text>
        <TextLink
          wrapperStyle={{
            marginBottom: 0,
          }}
          onPress={() => {
            console.warn('Not implemented');
          }}
        > Termos de uso
        </TextLink>
        <Text style={{
          fontSize: 12,
        }}
        > e a
        </Text>
        <TextLink
          wrapperStyle={{
            marginBottom: 0,
          }}
          onPress={() => {
            console.warn('Not implemented');
          }}
        > Política de Privacidade
        </TextLink>
      </View>
      <View style={{
        flexDirection: 'row',
      }}
      >
        <Text style={{
          fontSize: 12,
        }}
        >Já tenho uma conta.
        </Text>
        <TextLink
          wrapperStyle={{
            marginBottom: 0,
          }}
          onPress={() => {
            console.warn('Not implemented');
          }}
        > Entrar.
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
