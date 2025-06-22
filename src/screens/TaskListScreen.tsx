import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, Keyboard, Platform,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InternalStackParamList } from '../screens/TaskScreen';
import { TaskType } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<InternalStackParamList, 'List'>;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  completedTasks: TaskType[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export default function TaskListScreen({
  navigation, tasks, setTasks, completedTasks, setCompletedTasks,
}: Props) {
  const [text, setText] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const formatDate = () => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  const addTask = () => {
    if (!text.trim()) return;
    const newTask: TaskType = {
      id: Date.now().toString(),
      title: text.trim(),
      created: formatDate(),
    };
    setTasks([newTask, ...tasks]);
    setText('');
    Keyboard.dismiss();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const markComplete = (task: TaskType) => {
    const updated = { ...task, completedDate: formatDate() };
    setTasks(tasks.filter(t => t.id !== task.id));
    setCompletedTasks([updated, ...completedTasks]);
  };

  const markIncomplete = (task: TaskType) => {
    const { completedDate, ...rest } = task;
    setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
    setTasks([rest, ...tasks]);
  };

  const renderItem = (task: TaskType, isCompleted: boolean) => (
    <View style={[styles.card, { backgroundColor: task.color || '#fff' }]}>
      <View style={styles.taskItem}>
        <Checkbox
          value={isCompleted}
          onValueChange={() =>
            isCompleted ? markIncomplete(task) : markComplete(task)
          }
          style={styles.checkbox}
        />
        <TouchableOpacity
          style={styles.taskContent}
          onPress={() =>
            navigation.navigate('Detail', {
              task,
              onSave: updated => {
                if (task.completedDate) {
                  setCompletedTasks(prev =>
                    prev.map(t => (t.id === updated.id ? updated : t))
                  );
                } else {
                  setTasks(prev =>
                    prev.map(t => (t.id === updated.id ? updated : t))
                  );
                }
              },
            })
          }
        >
          <Text style={[styles.taskText, isCompleted && styles.completed]}>
            {task.title}
          </Text>

        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.heading}>Tasks</Text>
        {tasks.length ? (
          <FlatList data={tasks} keyExtractor={item => item.id}
            renderItem={({ item }) => renderItem(item, false)} />
        ) : <Text style={styles.noTaskText}>No task</Text>}
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => setShowCompleted(!showCompleted)}>
          <Text style={styles.heading}>Completed {showCompleted ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showCompleted && (
          completedTasks.length > 0 ? (
            <FlatList data={completedTasks} keyExtractor={item => item.id}
              renderItem={({ item }) => renderItem(item, true)} />
          ) : <Text style={styles.noTaskText}>No completed tasks</Text>
        )}
      </View>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Enter your task"
        value={text}
        onChangeText={setText}
        onSubmitEditing={addTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', backgroundColor: '#f9f9f9' },
  container: { width: '90%', flex: 1, marginBottom: 80 },
  heading: { fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
  card: {
    backgroundColor: '#fff', padding: 12, marginBottom: 12,
    borderRadius: 10, ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  taskItem: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { marginTop: 6 },
  taskContent: { marginLeft: 12, flex: 1 },
  taskText: { fontSize: 18 },
  completed: { textDecorationLine: 'line-through', color: '#888' },
  dateText: { fontSize: 14, color: '#aaa', marginTop: 4, textAlign: 'right' },
  noTaskText: { fontSize: 16, color: '#999', fontStyle: 'italic' },
  separator: { height: 1, backgroundColor: '#ccc', marginVertical: 16 },
  input: {
    width: '90%', height: 60, borderRadius: 10, paddingHorizontal: 16,
    fontSize: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    position: 'absolute', bottom: 20,
  },
});
