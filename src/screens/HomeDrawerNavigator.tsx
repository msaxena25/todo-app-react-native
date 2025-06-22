import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskScreen from './TaskScreen';
import TodoScreen from './TodoScreen';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TaskStack({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TaskMain"
        component={TaskScreen}
      />
    </Stack.Navigator>
  );
}

function TodoStack({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TodoMain"
        component={TodoScreen}
      />
    </Stack.Navigator>
  );
}

function HomeStack({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

export default function HomeDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      drawerPosition: 'left',
      headerShown: true,
      drawerType: 'slide'
    }}>
      <Drawer.Screen name="Home" component={HomeStack} options={{
        drawerIcon: ({ focused, size, color }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )
      }} />
      <Drawer.Screen name="Tasks" component={TaskStack} options={{
        drawerIcon: ({ focused, size, color }) => (
          <Ionicons name="today-outline" size={size} color={color} />
        )
      }} />
      <Drawer.Screen name="Todo" component={TodoStack} options={{
        drawerIcon: ({ focused, size, color }) => (
          <Ionicons name="checkbox-outline" size={size} color={color} />
        )
      }} />
    </Drawer.Navigator>
  );
}
