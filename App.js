import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./app/screens/LoginScreen";
import MyRoutines from "./app/screens/MyRoutines";
import Profile from "./app/screens/Profile";
import History from "./app/screens/History";
import Settings from "./app/screens/Settings";
import NewRoutine from "./app/screens/NewRoutine";
import { createStackNavigator } from "@react-navigation/stack";

const signedIn = true;

const ProfileStack = createStackNavigator();
const MyRoutinesStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const NewRoutineStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="My Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

function MyRoutinesStackScreen() {
  return (
    <MyRoutinesStack.Navigator>
      <MyRoutinesStack.Screen name="Routines" component={MyRoutines} />
      <MyRoutinesStack.Screen
        name="New Routine"
        component={NewRoutine}
        options={({ navigation, route }) => ({})}
      />
    </MyRoutinesStack.Navigator>
  );
}

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="Workout History" component={History} />
    </HistoryStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="Routines" component={MyRoutinesStackScreen} />
          <Tab.Screen name="History" component={HistoryStackScreen} />
          <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
