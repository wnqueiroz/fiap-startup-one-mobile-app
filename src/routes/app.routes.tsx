import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Walkthrough } from '../components/Walkthrough';
import { SCREENS } from '../contants';
import { Home } from '../screens/Home';
import { Ranking } from '../screens/Ranking';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      activeTintColor: '#FF7675',
      inactiveTintColor: '#545454',
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = '';

        switch (route.name) {
          case SCREENS.HOME:
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            break;
          case SCREENS.RANKING:
            iconName = focused ? 'ios-trophy' : 'ios-trophy-outline';
            break;
          default:
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name={SCREENS.HOME} component={Home} />
    <Tab.Screen name={SCREENS.RANKING} component={Ranking} />
  </Tab.Navigator>
);

export const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <AppStack.Screen
      name={SCREENS.WALKTHROUGH}
      component={Walkthrough}
    />
    <AppStack.Screen
      name={SCREENS.MAIN_BOTTOM}
      component={TabRoutes}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  </AppStack.Navigator>
);
