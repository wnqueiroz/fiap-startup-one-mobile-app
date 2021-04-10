import React from 'react';
import { Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { SCREENS } from '../contants';

const AppStack = createStackNavigator();

// TODO: create home screen
const Home: React.FC = () => (
  <View>
    <Text>Home</Text>
  </View>
);

export const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name={SCREENS.HOME}
      component={Home}
    />
  </AppStack.Navigator>
);
