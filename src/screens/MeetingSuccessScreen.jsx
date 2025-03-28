
import React, { useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Linking,
} from 'react-native';
import ArrowBackSVG from '../assets/meeting/ArrowBackSVG';
import RNCalendarEvents from 'react-native-calendar-events';
import { parse } from 'date-fns';

export default function MeetingSuccessScreen({ route, navigation }) {
    const { meeting } = route.params || {};

    const handleClose = useCallback(() => {
        navigation.navigate('Main', {
            screen: 'Meeting',
        });
    }, [navigation]);

    const parseDateTime = (dateStr, timeStr) => {
        const datePart = parse(dateStr, 'd/M/yyyy', new Date());

        if (timeStr.toUpperCase().includes('AM') || timeStr.toUpperCase().includes('PM')) {
            const [timePart, period] = timeStr.split(' ');
            let [hours, minutes] = timePart.split(':').map(Number);
            if (period.toUpperCase() === 'PM' && hours < 12) {
                hours += 12;
            }
            if (period.toUpperCase() === 'AM' && hours === 12) {
                hours = 0;
            }
            return new Date(datePart.getFullYear(), datePart.getMonth(), datePart.getDate(), hours, minutes);
        } else {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return new Date(datePart.getFullYear(), datePart.getMonth(), datePart.getDate(), hours, minutes);
        }
    };

    const openSystemCalendar = (date) => {
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        const appleTimestamp = unixTimestamp - 978307200;
        const url = `calshow:${appleTimestamp}`;
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Unable to open calendar with URL:', url);
            }
        });
    };

    const handleAddToCalendar = useCallback(async () => {
        try {
            const status = await RNCalendarEvents.authorizeEventStore();
            if (status !== 'authorized') {
                console.log('Calendar access not granted');
                return;
            }

            const [startTimeStr, endTimeStr] = meeting.time.split(' - ');
            const startDate = parseDateTime(meeting.date, startTimeStr);
            const endDate = parseDateTime(meeting.date, endTimeStr);

            const eventId = await RNCalendarEvents.saveEvent(meeting.eventName, {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                notes: meeting.comments,
            });

            console.log('Meeting object:', meeting);
            console.log('Event successfully added to calendar with id:', eventId);

            openSystemCalendar(startDate);
        } catch (error) {
            console.log('Error adding event to calendar:', error);
        }
    }, [meeting]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 22 }}>
                <TouchableOpacity onPress={handleClose} style={{ marginLeft: 16 }}>
                    <ArrowBackSVG />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 22, marginLeft: 27, marginRight: 37, maxWidth: 326 }}>
                <Text style={styles.title}>Meeting is successfully added</Text>
            </View>

            <View style={{ marginTop: 42, alignItems: 'center' }}>
                <Image
                    source={require('../assets/meeting/discussion.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddToCalendar}>
                    <Text style={styles.addButtonText}>Add to Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    title: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 44,
        color: '#FFFFFF',
        textAlign: 'left',
    },
    image: {
        width: 200,
        height: 200,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#181818',
        padding: 16,
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    addButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#181818',
    },
    closeButton: {
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF',
    },
});
