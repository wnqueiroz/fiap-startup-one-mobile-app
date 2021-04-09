import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SCREENS } from './contants';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';

const Stack = createStackNavigator();

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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#fff' },
          }}
        >
          <Stack.Screen name={SCREENS.SIGN_IN} component={SignIn} />
          <Stack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
