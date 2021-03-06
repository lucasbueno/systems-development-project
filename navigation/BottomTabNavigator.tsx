/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';
import { BottomTabParamList, HomeParamList, ConfigParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
            title:"Início",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }
        }
      />
      <BottomTab.Screen
        name="Config"
        component={ConfigNavigator}
        options={{
            title:"Configurações",
            tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }
        }
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Início' }}
      />
    </HomeStack.Navigator>
  );
}

const ConfigStack = createStackNavigator<ConfigParamList>();

function ConfigNavigator() {
  return (
    <ConfigStack.Navigator>
      <ConfigStack.Screen
        name="ConfigScreen"
        component={ConfigScreen}
        options={{ headerTitle: 'Configurações' }}
      />
    </ConfigStack.Navigator>
  );
}
