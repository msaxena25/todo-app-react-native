import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button,
  TouchableOpacity, FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InternalStackParamList } from '../screens/TaskScreen';

const colorOptions = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa'];

type Props = NativeStackScreenProps<InternalStackParamList, 'Detail'> & {
  onSave: (task: any) => void;
};

export default function TaskDetailScreen({ navigation, route, onSave }: Props) {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [selectedColor, setSelectedColor] = useState(task.color || colorOptions[0]);

  const handleSave = () => {
    onSave({ ...task, title, color: selectedColor });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Task Details</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Task Info */}
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.info}>{task.id}</Text>

      <Text style={styles.label}>Created On:</Text>
      <Text style={styles.info}>{task.created}</Text>

      {/* Edit Title */}
      <Text style={styles.label}>Edit Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      {/* Color Picker */}
      <Text style={styles.label}>Choose Card Color:</Text>
      <FlatList
        data={colorOptions}
        keyExtractor={item => item}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.colorCircle,
              {
                backgroundColor: item,
                borderWidth: selectedColor === item ? 3 : 0,
                borderColor: '#000',
              },
            ]}
            onPress={() => setSelectedColor(item)}
          />
        )}
        contentContainerStyle={{ marginVertical: 10 }}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: { fontSize: 28, fontWeight: 'bold', color: '#444' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 14 },
  info: { fontSize: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 6,
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
});
