import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import AppNavigator from '../AppNavigation';
import DrawerContent from './DrawerContent';
import { Routes } from '../../common';
import { LanguageScreen, UserScreen } from '../../screens/App';

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        // @ts-ignore
        <DrawerContent {...props} />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name='main' component={AppNavigator} />

      <Drawer.Screen name={Routes.LanguageScreen} component={LanguageScreen} />
      <Drawer.Screen name={Routes.ProfileStack} component={UserScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
