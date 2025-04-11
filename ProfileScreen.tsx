import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Avatar, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subscription: 'Premium',
    memberSince: '2024-01-01',
    classesBooked: 12,
    favoriteInstrument: 'Guitar'
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={user.name.split(' ').map(n => n[0]).join('')} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <List.Item
          title="Current Plan"
          description={user.subscription}
          left={props => <List.Icon {...props} icon="star" />}
        />
        <List.Item
          title="Member Since"
          description={new Date(user.memberSince).toLocaleDateString()}
          left={props => <List.Icon {...props} icon="calendar" />}
        />
      </View>

      <Divider />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <List.Item
          title="Classes Booked"
          description={user.classesBooked.toString()}
          left={props => <List.Icon {...props} icon="music" />}
        />
        <List.Item
          title="Favorite Instrument"
          description={user.favoriteInstrument}
          left={props => <List.Icon {...props} icon="guitar-acoustic" />}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => console.log('Edit Profile')}
          style={styles.button}
          icon="account-edit"
        >
          Edit Profile
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log('Manage Subscription')}
          style={styles.button}
          icon="credit-card"
        >
          Manage Subscription
        </Button>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}
          icon="logout"
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
});

export default ProfileScreen; 