import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {
  ProfileScreen,
  LeaderBoardScreen,
  TermsScreen,
  AboutUsScreen,
  DeptScreen,
  NotificationScreen,
  EditProfileScreen,
  MemberDetailScreen,
  BeoDetailScreen,
  ItemDetailScreen,
} from '../screens/App';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.ProfileScreen}>
      <Stack.Screen name={Routes.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={Routes.LeaderBoardScreen}
        component={LeaderBoardScreen}
      />
      <Stack.Screen name={Routes.AboutUsScreen} component={AboutUsScreen} />
      <Stack.Screen name={Routes.TermsScreen} component={TermsScreen} />
      <Stack.Screen name={Routes.DeptScreen} component={DeptScreen} />
      <Stack.Screen
        name={Routes.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={Routes.EditProfileScreen}
        component={EditProfileScreen}
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

export default ProfileNavigator;
