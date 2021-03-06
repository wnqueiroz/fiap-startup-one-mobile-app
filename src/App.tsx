import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { AppointmentsProvider } from './contexts/appointments';
import { AuthProvider } from './contexts/auth';
import { GamificationProvider } from './contexts/gamification';
import { ModalProvider } from './contexts/modal';
import { StatusBarProvider, useStatusBar } from './contexts/statusBar';
import Routes from './routes';

const StatusBarBg: React.FC = () => {
  const { color } = useStatusBar();

  return (
    <SafeAreaView style={{
      flex: 0,
      backgroundColor: color,
    }}
    />
  );
};

export const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ModalProvider>
      <StatusBarProvider>
        <StatusBarBg />
        <SafeAreaView style={{
          flex: 1,
        }}
        >
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />

          <NavigationContainer>
            <AuthProvider>
              <AppointmentsProvider>
                <GamificationProvider>
                  <Routes />
                </GamificationProvider>
              </AppointmentsProvider>
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaView>
      </StatusBarProvider>
    </ModalProvider>
  );
};
