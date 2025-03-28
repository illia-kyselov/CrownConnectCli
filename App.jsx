import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import { persistor, store } from './src/store/store';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import CalendarScreen from './src/screens/CalendarScreen';
import MeetingDetailsScreen from './src/screens/MeetingDetailsScreen';
import NewMeetingScreen from './src/screens/NewMeetingScreen';
import MeetingSuccessScreen from './src/screens/MeetingSuccessScreen';
import NewContactScreen from './src/screens/NewContactScreen';
import ContactAddedScreen from './src/screens/ContactAddedScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Main" component={BottomTabNavigator} />
                        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
                        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
                        <Stack.Screen name="MeetingDetails" component={MeetingDetailsScreen} />
                        <Stack.Screen name="NewMeeting" component={NewMeetingScreen} />
                        <Stack.Screen name="MeetingSuccess" component={MeetingSuccessScreen} />
                        <Stack.Screen name="NewContact" component={NewContactScreen} />
                        <Stack.Screen name="ContactAdded" component={ContactAddedScreen} />
                        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
