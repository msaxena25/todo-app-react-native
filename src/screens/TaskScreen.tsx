import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskType } from '../../App';
import TaskListScreen from './TaskListScreen';
import TaskDetailScreen from './TaskDetailScreen';


export type InternalStackParamList = {
  List: undefined;
  Detail: { task: TaskType; onSave: (task: TaskType) => void };
};

const Stack = createNativeStackNavigator<InternalStackParamList>();

export default function TaskScreen() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);

  const updateTask = (updated: TaskType) => {
    const update = (arr: TaskType[]) =>
      arr.map(t => (t.id === updated.id ? updated : t));

    setTasks(prev => update(prev));
    setCompletedTasks(prev => update(prev));
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="List">
        {props => (
          <TaskListScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Detail"
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      >
        {props => (
          <TaskDetailScreen {...props} onSave={updateTask} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
