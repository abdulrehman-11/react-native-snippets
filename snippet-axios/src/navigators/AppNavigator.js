import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Routes, Icons, Colors } from "../common";
import {
  HomeNavigator,
  MemberNavigator,
  ItemNavigator,
  ProfileNavigator,
  BeoNavigator,
} from ".";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.darkBlue,
      }}
      initialRouteName={Routes.HomeScreen}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.AntDesign name="home" size={size} color={color} />
          ),
        }}
        name={Routes.Home}
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.Fontisto name="persons" size={size} color={color} />
          ),
        }}
        name={Routes.Members}
        component={MemberNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.Feather name="layers" size={size} color={color} />
          ),
        }}
        name={Routes.Items}
        component={ItemNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.SimpleLineIcons name="event" size={size} color={color} />
          ),
        }}
        name={Routes.Beo}
        component={BeoNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.Ionicons name="person" size={size} color={color} />
          ),
        }}
        name={Routes.Profile}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
