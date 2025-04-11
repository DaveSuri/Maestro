import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import ClassListScreen from './screens/ClassListScreen';
// We'll create these screens later
const ClassDetailScreen = () => null;
const ProfileScreen = () => null;
const MyScheduleScreen = () => null;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ClassStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ClassList" 
      component={ClassListScreen} 
      options={{ title: 'Classes' }}
    />
    <Stack.Screen 
      name="ClassDetail" 
      component={ClassDetailScreen} 
      options={{ title: 'Class Details' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Classes') {
                iconName = focused ? 'music' : 'music-outline';
              } else if (route.name === 'Schedule') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'account' : 'account-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Classes" 
            component={ClassStack} 
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Schedule" 
            component={MyScheduleScreen}
            options={{ title: 'My Schedule' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App; 