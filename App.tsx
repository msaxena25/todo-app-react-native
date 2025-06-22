import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeDrawerNavigator from './src/screens/HomeDrawerNavigator';
import 'react-native-gesture-handler';

export type TaskType = {
  id: string;
  title: string;
  created: string;
  completedDate?: string;
  color?: string; // Add this
};


export type RootStackParamList = {
  TaskScreen: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <HomeDrawerNavigator />
    </NavigationContainer>
  );
}
