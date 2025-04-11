import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyScheduleScreen = ({ navigation }) => {
  // Mock booked classes data - in a real app, this would come from your API
  const bookedClasses = [
    {
      id: 1,
      name: 'Guitar Basics',
      level: 'Beginner',
      startTime: '2025-04-08T18:00:00Z',
      instructorName: 'Priya S.',
      instrument: 'Guitar',
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Piano Chords',
      level: 'Intermediate',
      startTime: '2025-04-10T19:00:00Z',
      instructorName: 'Amit K.',
      instrument: 'Piano',
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Advanced Guitar Solos',
      level: 'Advanced',
      startTime: '2025-04-05T20:00:00Z',
      instructorName: 'Priya S.',
      instrument: 'Guitar',
      status: 'completed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#34C759';
      case 'completed':
        return '#8E8E93';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const handleCancelClass = (classId) => {
    // Implement cancellation logic
    console.log('Cancelling class:', classId);
  };

  const handleViewClass = (classId) => {
    navigation.navigate('ClassDetail', { classId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Schedule</Text>
        <Text style={styles.subtitle}>
          {bookedClasses.filter(c => c.status === 'upcoming').length} upcoming classes
        </Text>
      </View>

      {bookedClasses.map((classItem) => (
        <Card key={classItem.id} style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.className}>{classItem.name}</Text>
              <Chip
                mode="outlined"
                style={[styles.statusChip, { borderColor: getStatusColor(classItem.status) }]}
                textStyle={{ color: getStatusColor(classItem.status) }}
              >
                {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
              </Chip>
            </View>

            <View style={styles.infoRow}>
              <Icon name="music" size={20} color="#666" />
              <Text style={styles.infoText}>{classItem.instrument}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="account" size={20} color="#666" />
              <Text style={styles.infoText}>Instructor: {classItem.instructorName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="clock-outline" size={20} color="#666" />
              <Text style={styles.infoText}>
                {new Date(classItem.startTime).toLocaleDateString()} at{' '}
                {new Date(classItem.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => handleViewClass(classItem.id)}
                style={styles.button}
              >
                View Details
              </Button>
              {classItem.status === 'upcoming' && (
                <Button
                  mode="outlined"
                  onPress={() => handleCancelClass(classItem.id)}
                  style={[styles.button, styles.cancelButton]}
                  textColor="#FF3B30"
                >
                  Cancel Class
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    margin: 16,
    marginTop: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusChip: {
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
  cancelButton: {
    borderColor: '#FF3B30',
  },
});

export default MyScheduleScreen; 