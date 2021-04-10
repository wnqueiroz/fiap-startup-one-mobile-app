import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image, StyleSheet, Text, View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ASYNC_STORAGE_KEYS, SCREENS } from '../contants';
import { Button } from './Button';

type Content = {
  title: string;
  subtitle: string;
  sourceImage: any;
}

const Stack = createStackNavigator();

export const Walkthrough: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const contents: Content[] = [{
    title: 'Chega de esquecer seus compromissos!',
    subtitle: 'Enviaremos informações importantes para você sobre seus compromissos: horário de atendimento e alterações, agendamento cancelado, tudo isso e muito mais!',
    sourceImage: require('../assets/walkthrough-step-01.png'),
  }, {
    title: 'Seus lugares favoritos em um só lugar!',
    subtitle: 'Busque por diferentes estabelecimentos, encontre o serviço que deseja, marque um compromisso, favorite e acesse seus serviços prediletos!',
    sourceImage: require('../assets/walkthrough-step-02.png'),
  }, {
    title: 'Acumule pontos e ganhe recompensas!',
    subtitle: 'Sempre que cumprir um compromisso, você pode acumular experiência, subir de nível e obter recompensas exclusivas dos estabelecimentos. Teste sua sorte com a nossa roleta de recompensas!',
    sourceImage: require('../assets/walkthrough-step-03.png'),
  }];

  useEffect(() => {
    async function loadAsyncStorageData(): Promise<void> {
      const alreadyFinished = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.APP_WALKTHROUGH);

      if (alreadyFinished) {
        navigation.navigate(SCREENS.MAIN_BOTTOM);
      } else {
        setLoading(false);
      }
    }
    loadAsyncStorageData();
  }, []);

  function renderViews(): any {
    return contents.map(({ title, subtitle, sourceImage }, index) => {
      const currentStep = index + 1;

      const pageName = `WALKTHROUGH_${currentStep}`;
      const isLast = index === contents.length - 1;

      const nextPageName = isLast ? SCREENS.MAIN_BOTTOM : `WALKTHROUGH_${currentStep + 1}`;
      const buttonLabel = isLast ? 'Começar!' : 'Próximo';

      return (
        <Stack.Screen key={pageName} name={pageName}>
          {() => (
            <View
              key={pageName}
              style={styles.Container}
            >
              <Text style={styles.Title}>{title}</Text>

              <Image
                style={styles.Image}
                source={sourceImage}
              />

              <Text style={styles.Subtitle}>{subtitle}</Text>

              <Button onPress={() => {
                navigation.navigate(nextPageName);

                if (isLast) {
                  AsyncStorage.setItem(ASYNC_STORAGE_KEYS.APP_WALKTHROUGH, 'true');
                }
              }}
              >
                {buttonLabel}
              </Button>
            </View>
          )}
        </Stack.Screen>
      );
    });
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      {renderViews()}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  Title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  Subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#808080',
    marginBottom: 200,
    height: 100,
  },
  Image: {
    width: 190,
    height: 190,
    marginBottom: 30,
  },
});
