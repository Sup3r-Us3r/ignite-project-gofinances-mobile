import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'android' ? 0 : 20,
        },
      }}
    >
      <Screen
        name="List"
        component={Dashboard}
        options={{
          tabBarIcon: (({ color, size }) =>
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Listagem',
        }}
      />
      <Screen
        name="Register"
        component={Register}
        options={{
          tabBarIcon: (({ color, size }) =>
            <MaterialIcons
              name="attach-money"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Cadastrar',
        }}
      />
      <Screen
        name="Resume"
        component={Resume}
        options={{
          tabBarIcon: (({ color, size }) =>
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'Resumo',
        }}
      />
    </Navigator>
  );
}
