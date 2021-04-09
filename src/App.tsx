import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { SignUp } from './screens/SignUp';

export const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{
      flex: 1,
    }}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <SignUp />
    </SafeAreaView>
  );
};
