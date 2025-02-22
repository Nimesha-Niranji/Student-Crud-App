import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import AddScreen from './screens/AddScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#D8BFD8' },
        headerTitleStyle: { color: 'black', fontSize: 18, fontWeight: 'bold' },
      }}
      >
        <Stack.Screen name="Student List" component={HomeScreen} />
        <Stack.Screen name="Edit Students" component={EditScreen} />
        <Stack.Screen name="Add Students" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
