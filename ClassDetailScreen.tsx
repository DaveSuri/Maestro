import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ClassDetailScreen = ({ route, navigation }) => {
  const { classId } = route.params;
  // In a real app, fetch class details from API
  const classDetails = {
    id: classId,
    name: 'Guitar Basics',
    level: 'Beginner',
    startTime: '2025-04-08T18:00:00Z',
    instructorName: 'Priya S.',
    spotsAvailable: 5,
    instrument: 'Guitar',
    description: 'Learn the fundamentals of playing guitar in this beginner-friendly class. We\'ll cover basic chords, strumming patterns, and simple songs.',
    duration: '60 minutes',
    location: 'Studio A',
    price: '$25'
  };

  const handleBookClass = () => {
    // Implement booking logic
    console.log('Booking class:', classId);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{classDetails.name}</Text>
          <Chip style={styles.levelChip} mode="outlined">
            {classDetails.level}
          </Chip>
          
          <View style={styles.infoRow}>
            <Icon name="clock-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              {new Date(classDetails.startTime).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="account" size={20} color="#666" />
            <Text style={styles.infoText}>Instructor: {classDetails.instructorName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color="#666" />
            <Text style={styles.infoText}>Location: {classDetails.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="clock" size={20} color="#666" />
            <Text style={styles.infoText}>Duration: {classDetails.duration}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="ticket" size={20} color="#666" />
            <Text style={styles.infoText}>Price: {classDetails.price}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="account-group" size={20} color="#666" />
            <Text style={styles.infoText}>
              {classDetails.spotsAvailable} spots available
            </Text>
          </View>

          <Text style={styles.sectionTitle}>About this class</Text>
          <Text style={styles.description}>{classDetails.description}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleBookClass}
        style={styles.bookButton}
        disabled={classDetails.spotsAvailable <= 0}
      >
        {classDetails.spotsAvailable > 0 ? 'Book Class' : 'Class Full'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  levelChip: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  bookButton: {
    margin: 16,
    paddingVertical: 8,
  },
});

export default ClassDetailScreen; 