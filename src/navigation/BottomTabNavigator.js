import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ContactsScreen from '../screens/ContactsScreen';
import MeetingScreen from '../screens/MeetingScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import SettingsScreen from '../screens/SettingsScreen';

import ContactsSVG from '../assets/navbar/ContactsSVG';
import MeetingSVG from '../assets/navbar/MeetingSVG';
import ArticlesSVG from '../assets/navbar/ArticlesSVG';
import SettingsSVG from '../assets/navbar/SettingsSVG';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 102,
                    backgroundColor: '#181818',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    paddingTop: 8,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#999999',
            }}
        >
            <Tab.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ContactsSVG color={focused ? '#fff' : '#999'} width={33} height={32} />
                    ),
                }}
            />
            <Tab.Screen
                name="Meeting"
                component={MeetingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MeetingSVG color={focused ? '#fff' : '#999'} width={33} height={32} />
                    ),
                }}
            />
            <Tab.Screen
                name="Articles"
                component={ArticlesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ArticlesSVG color={focused ? '#fff' : '#999'} width={33} height={32} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SettingsSVG color={focused ? '#fff' : '#999'} width={33} height={32} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
