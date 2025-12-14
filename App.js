import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import our Theme
import { theme } from './src/theme';

// Import our Screens
import HomeScreen from './src/screens/HomeScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // We will build custom headers later
            tabBarActiveTintColor: theme.colors.primary, // Gold when active
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { 
              paddingBottom: 5, 
              height: 60,
              borderTopColor: theme.colors.border
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Marketplace') {
                iconName = focused ? 'bag-handle' : 'bag-handle-outline';
              } else if (route.name === 'Design Lab') {
                iconName = focused ? 'color-wand' : 'color-wand-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
          <Tab.Screen name="Design Lab" component={ToolsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

      </NavigationContainer>
    </ThemeProvider>
  );
}