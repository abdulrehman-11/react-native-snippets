import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {
  NotificationScreen,
  RezCategoryScreen,
  RezScreen,
  MemberDetailScreen,
  BeoDetailScreen,
  ItemDetailScreen,
} from '../screens/App';

const Stack = createStackNavigator();

const RezNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.RezCategoryScreen}>
      <Stack.Screen
        name={Routes.RezCategoryScreen}
        component={RezCategoryScreen}
      />
      <Stack.Screen name={Routes.RezScreen} component={RezScreen} />
      <Stack.Screen
        name={Routes.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={Routes.MembersDetailScreen}
        component={MemberDetailScreen}
      />
      <Stack.Screen name={Routes.BeoDetailScreen} component={BeoDetailScreen} />
      <Stack.Screen
        name={Routes.ItemDetailScreen}
        component={ItemDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default RezNavigator;
