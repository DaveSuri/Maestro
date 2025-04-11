import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Chip, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data - in a real app, this would come from your API
const mockClasses = [
  { id: 1, name: 'Guitar Basics', level: 'Beginner', startTime: '2025-04-08T18:00:00Z', instructorName: 'Priya S.', spotsAvailable: 5, instrument: 'Guitar' },
  { id: 2, name: 'Piano Chords', level: 'Intermediate', startTime: '2025-04-08T19:00:00Z', instructorName: 'Amit K.', spotsAvailable: 3, instrument: 'Piano' },
  { id: 3, name: 'Advanced Guitar Solos', level: 'Advanced', startTime: '2025-04-08T20:00:00Z', instructorName: 'Priya S.', spotsAvailable: 2, instrument: 'Guitar' },
  { id: 4, name: 'Violin for Beginners', level: 'Beginner', startTime: '2025-04-09T17:00:00Z', instructorName: 'Rahul M.', spotsAvailable: 4, instrument: 'Violin' },
  { id: 5, name: 'Drum Basics', level: 'Beginner', startTime: '2025-04-09T18:00:00Z', instructorName: 'Neha P.', spotsAvailable: 6, instrument: 'Drums' },
];

const ClassListScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClasses(mockClasses);
      setLoading(false);
    }, 1000);
  }, []);

  const filterClasses = () => {
    return classes.filter(classItem => {
      const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           classItem.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInstrument = !selectedInstrument || classItem.instrument === selectedInstrument;
      const matchesLevel = !selectedLevel || classItem.level === selectedLevel;
      
      return matchesSearch && matchesInstrument && matchesLevel;
    });
  };

  const renderClassItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('ClassDetail', { classId: item.id })}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text style={styles.className}>{item.name}</Text>
          <Chip mode="outlined" style={styles.levelChip}>
            {item.level}
          </Chip>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="clock-outline" size={20} color="#666" />
          <Text style={styles.infoText}>
            {new Date(item.startTime).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="account" size={20} color="#666" />
          <Text style={styles.infoText}>Instructor: {item.instructorName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="account-group" size={20} color="#666" />
          <Text style={styles.infoText}>
            {item.spotsAvailable} spots available
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('ClassDetail', { classId: item.id })}
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Instrument:</Text>
        <View style={styles.chipContainer}>
          <Chip 
            selected={selectedInstrument === null} 
            onPress={() => setSelectedInstrument(null)}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip 
            selected={selectedInstrument === 'Guitar'} 
            onPress={() => setSelectedInstrument('Guitar')}
            style={styles.filterChip}
          >
            Guitar
          </Chip>
          <Chip 
            selected={selectedInstrument === 'Piano'} 
            onPress={() => setSelectedInstrument('Piano')}
            style={styles.filterChip}
          >
            Piano
          </Chip>
          <Chip 
            selected={selectedInstrument === 'Violin'} 
            onPress={() => setSelectedInstrument('Violin')}
            style={styles.filterChip}
          >
            Violin
          </Chip>
        </View>
      </View>
      
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Level:</Text>
        <View style={styles.chipContainer}>
          <Chip 
            selected={selectedLevel === null} 
            onPress={() => setSelectedLevel(null)}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip 
            selected={selectedLevel === 'Beginner'} 
            onPress={() => setSelectedLevel('Beginner')}
            style={styles.filterChip}
          >
            Beginner
          </Chip>
          <Chip 
            selected={selectedLevel === 'Intermediate'} 
            onPress={() => setSelectedLevel('Intermediate')}
            style={styles.filterChip}
          >
            Intermediate
          </Chip>
          <Chip 
            selected={selectedLevel === 'Advanced'} 
            onPress={() => setSelectedLevel('Advanced')}
            style={styles.filterChip}
          >
            Advanced
          </Chip>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading classes...</Text>
      </View>
    );
  }

  const filteredClasses = filterClasses();

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search classes or instructors"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      {renderFilters()}
      
      {filteredClasses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No classes found</Text>
          <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
        </View>
      ) : (
        <FlatList
          data={filteredClasses}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    marginBottom: 16,
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
  levelChip: {
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666',
  },
});

export default ClassListScreen; 