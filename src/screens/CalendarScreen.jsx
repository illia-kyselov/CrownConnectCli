import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setFilterDate } from '../store/slices/meetingsSlice';
import CloseSVG from '../assets/CloseSVG';

export default function CalendarScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;

    const markedDates = useMemo(() => {
        const marks = {};
        if (todayString) {
            marks[todayString] = {
                customStyles: {
                    container: {
                        backgroundColor: '#FFF'
                    },
                    text: {
                        color: '#000'
                    }
                }
            };
        }
        if (selectedDate) {
            marks[selectedDate] = {
                selected: true,
                selectedColor: '#FFF',
                selectedTextColor: '#181818'
            };
        }
        return marks;
    }, [selectedDate, todayString]);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const onShowDatePress = () => {
        const formattedDate = format(parseISO(selectedDate), 'dd/MM/yyyy');
        dispatch(setFilterDate(formattedDate));
        navigation.navigate('Main', {
            screen: 'Meeting'
        });
    };

    return (
        <>
            <SafeAreaView style={styles.safeAreaTop} />
            <SafeAreaView style={styles.safeAreaBottom}>
                <View style={styles.navBar}>
                    <Text style={styles.headerTitle}>Calendar</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CloseSVG />
                    </TouchableOpacity>
                </View>

                <View style={styles.calendarContainer}>
                    <Calendar
                        style={styles.calendar}
                        theme={{
                            backgroundColor: '#131313',
                            calendarBackground: '#181818',
                            dayTextColor: '#FFF',
                            textSectionTitleColor: '#FFF',
                            monthTextColor: '#FFF',
                            arrowColor: '#FFF',
                            textDisabledColor: '#888',
                            todayTextColor: '#000'
                        }}
                        onDayPress={onDayPress}
                        markingType="custom"
                        markedDates={markedDates}
                        initialDate={todayString}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.showDateButton,
                            !selectedDate && styles.showDateButtonDisabled
                        ]}
                        onPress={onShowDatePress}
                        disabled={!selectedDate}
                    >
                        <Text style={styles.showDateButtonText}>
                            {selectedDate ? `Show ${selectedDate}` : 'Select a date'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaTop: {
        backgroundColor: '#181818'
    },
    safeAreaBottom: {
        flex: 1,
        backgroundColor: '#000'
    },
    navBar: {
        backgroundColor: '#131313',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        height: 65,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '900',
        fontSize: 28,
        color: '#FFFFFF'
    },
    calendarContainer: {
        backgroundColor: '#131313',
        borderRadius: 24,
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 12,
        marginHorizontal: 16,
        overflow: 'hidden'
    },
    calendar: {
        backgroundColor: '#181818'
    },
    buttonContainer: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 122,
    },
    showDateButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    showDateButtonDisabled: {
        opacity: 0.5
    },
    showDateButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#000'
    }
});
