import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { SignIn } from './screens/SignIn';

export const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{
      flex: 1,
    }}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <SignIn />
    </SafeAreaView>
  );
};
