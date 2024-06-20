import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {
  ItemsScreen,
  ItemDetailScreen,
  NotificationScreen,
  FilterItemScreen,
  FilterListScreen,
  MemberDetailScreen,
  BeoDetailScreen,
} from '../screens/App';

const Stack = createStackNavigator();

const ItemNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.ItemsScreen}>
      <Stack.Screen name={Routes.ItemsScreen} component={ItemsScreen} />
      <Stack.Screen
        name={Routes.ItemDetailScreen}
        component={ItemDetailScreen}
      />
      <Stack.Screen
        name={Routes.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={Routes.FilteredItemsScreen}
        component={FilterItemScreen}
      />
      <Stack.Screen
        name={Routes.FilterListScreen}
        component={FilterListScreen}
      />

      <Stack.Screen
        name={Routes.MembersDetailScreen}
        component={MemberDetailScreen}
      />
      <Stack.Screen name={Routes.BeoDetailScreen} component={BeoDetailScreen} />
    </Stack.Navigator>
  );
};

export default ItemNavigator;
