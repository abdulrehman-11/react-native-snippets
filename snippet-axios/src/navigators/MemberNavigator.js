import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {
  MembersScreen,
  MemberDetailScreen,
  NotificationScreen,
  FilterMemberScreen,
  FilterListScreen,
  BeoDetailScreen,
  ItemDetailScreen,
} from '../screens/App';

const Stack = createStackNavigator();

const MemberNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.MembersScreen}>
      <Stack.Screen name={Routes.MembersScreen} component={MembersScreen} />
      <Stack.Screen
        name={Routes.MembersDetailScreen}
        component={MemberDetailScreen}
      />
      <Stack.Screen
        name={Routes.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={Routes.FilteredMemberScreen}
        component={FilterMemberScreen}
      />
      <Stack.Screen
        name={Routes.FilterListScreen}
        component={FilterListScreen}
      />

      <Stack.Screen name={Routes.BeoDetailScreen} component={BeoDetailScreen} />
      <Stack.Screen
        name={Routes.ItemDetailScreen}
        component={ItemDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MemberNavigator;
