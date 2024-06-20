import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {
  HomeScreen,
  ProfileScreen,
  QuizDetailScreen,
  LeaderBoardScreen,
  AboutUsScreen,
  TermsScreen,
  DeptScreen,
  NotificationScreen,
  QuizStartScreen,
  QuizEndScreen,
  ContentDetailScreen,
  RezScreen,
  RezCategoryScreen,
  ItemDetailScreen,
  MemberDetailScreen,
  BeoDetailScreen,
} from '../screens/App';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.HomeScreen}>
      <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={Routes.QuizDetailScreen}
        component={QuizDetailScreen}
      />
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
      <Stack.Screen name={Routes.QuizStartScreen} component={QuizStartScreen} />
      <Stack.Screen name={Routes.QuizEndScreen} component={QuizEndScreen} />
      <Stack.Screen
        name={Routes.ContentDetailScreen}
        component={ContentDetailScreen}
      />
      <Stack.Screen name={Routes.BeoDetailScreen} component={BeoDetailScreen} />
      <Stack.Screen name={Routes.RezScreen} component={RezScreen} />
      <Stack.Screen
        name={Routes.RezCategoryScreen}
        component={RezCategoryScreen}
      />
      <Stack.Screen
        name={Routes.MembersDetailScreen}
        component={MemberDetailScreen}
      />
      <Stack.Screen
        name={Routes.ItemDetailScreen}
        component={ItemDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
