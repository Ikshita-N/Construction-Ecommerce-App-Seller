import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../src/screens/HomeScreen/HomeScreen";
import YourProductsScreen from "../src/screens/YourProductsScreen/YourProductsScreen";
import SellingHistoryScreen from "../src/screens/SellingHistoryScreen/SellingHistoryScreen";
import AccountScreen from "../src/screens/AccountScreen/AccountScreen";
import StatisticsScreen from "../src/screens/StatisticsScreen/StatisticsScreen";
import { Ionicons } from "@expo/vector-icons";
import Header from "../src/components/Header/Header";
import SearchPage from '../src/screens/SearchPage/SearchPage';
import ProductInfoScreen from '../src/screens/ProductInfoScreen/ProductInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const mainSections = [
  { label: 'Your Products', route: 'YourProducts', icon: 'storefront-outline' }, 
  { label: 'Selling History', route: 'SellingHistory', icon: 'time-outline' }, 
  { label: 'Account', route: 'Account', icon: 'person-outline' }, 
  { label: 'Statistics', route: 'Statistics', icon: 'stats-chart-outline' }, 
];

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { icon } = mainSections.find(section => section.route === route.name);
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {mainSections.map((section) => (
        <Tab.Screen
          key={section.route}
          name={section.route}
          component={getScreenComponent(section.route)}
          options={{ tabBarLabel: section.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

const getScreenComponent = (route) => {
  switch (route) {
    case 'YourProducts':
      return YourProductsScreen;
    case 'SellingHistory':
      return SellingHistoryScreen;
    case 'Account':
      return AccountScreen;
    case 'Statistics':
      return StatisticsScreen;
    default:
      return HomeScreen;
  }
};

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ header: (props) => <Header {...props} /> }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchPage}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />                    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
