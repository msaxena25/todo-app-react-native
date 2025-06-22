import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { TaskType } from '../../App';

export default function HomeScreen() {
    const [starredTasks, setStarredTasks] = useState<TaskType[]>([]); // You can wire this to real state later

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>⭐ Starred Tasks</Text>

            {starredTasks.length === 0 ? (
                <Text style={styles.noStarText}>No starred task</Text>
            ) : (
                <FlatList
                    data={starredTasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.card, { backgroundColor: item.color || '#fff' }]}>
                            <Text style={styles.taskText}>{item.title}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    noStarText: { fontSize: 16, color: '#888', fontStyle: 'italic' },
    card: {
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 3 },
        }),
    },
    taskText: { fontSize: 18 },
});
