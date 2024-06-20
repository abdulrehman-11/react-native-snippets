import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {
  BeoScreen,
  BeoDetailScreen,
  NotificationScreen,
  RezScreen,
  RezCategoryScreen,
  MemberDetailScreen,
  ItemDetailScreen,
} from '../screens/App';
import BeoDocumentScreen from '../screens/App/BeoDocumentScreen';

const Stack = createStackNavigator();

const BeoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.BeoScreen}>
      <Stack.Screen name={Routes.BeoScreen} component={BeoScreen} />
      <Stack.Screen name={Routes.BeoDetailScreen} component={BeoDetailScreen} />
      <Stack.Screen
        name={Routes.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen name={Routes.RezScreen} component={RezScreen} />
      <Stack.Screen
        name={Routes.RezDetailScreen}
        component={RezCategoryScreen}
      />
      <Stack.Screen
        name={Routes.MembersDetailScreen}
        component={MemberDetailScreen}
      />
      <Stack.Screen
        name={Routes.BeoDocumentScreen}
        component={BeoDocumentScreen}
      />

      <Stack.Screen
        name={Routes.ItemDetailScreen}
        component={ItemDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default BeoNavigator;
