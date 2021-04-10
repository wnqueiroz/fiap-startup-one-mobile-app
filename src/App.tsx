import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';

export const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};
