import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SCREENS } from '../contants';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const Stack = createStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <Stack.Screen name={SCREENS.SIGN_IN} component={SignIn} />
    <Stack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
  </Stack.Navigator>
);
