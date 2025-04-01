import React, { useMemo } from 'react';
import {
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { parse, startOfDay, addDays, isWithinInterval } from 'date-fns';

import MeetingHeader from '../components/Meeting/MeetingHeader';
import AllContactsCard from '../components/Meeting/AllContactsCard';
import EmptyMeetings from '../components/EmptyMeetings';
import { isEventExpired } from '../utils/eventHelpers';
import { clearFilterDate, clearSearchQuery, setActiveTab, setSearchQuery } from '../store/slices/meetingsSlice';

export default function MeetingScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        activeTab,
        filterDate,
        searchQuery,
        allContactsData,
    } = useSelector(state => state.meetings);

    const isFiltered = !!filterDate;

    const filteredAllContacts = useMemo(() => {
        if (!filterDate) {return allContactsData;}
        return allContactsData.filter(item => item.date === filterDate);
    }, [filterDate, allContactsData]);

    const closestDataFromAllContacts = useMemo(() => {
        const today = startOfDay(new Date());
        const oneWeekLater = addDays(today, 7);
        return allContactsData.filter(item => {
            const eventDate = parse(item.date, 'dd/MM/yyyy', new Date());
            return isWithinInterval(eventDate, { start: today, end: oneWeekLater });
        });
    }, [allContactsData]);

    const baseData = useMemo(() => {
        if (activeTab === 'Active') {
            return isFiltered ? filteredAllContacts : allContactsData;
        } else {
            const source = isFiltered ? filteredAllContacts : allContactsData;
            return source.filter(isEventExpired);
        }
    }, [activeTab, isFiltered, filteredAllContacts, allContactsData]);

    const dataToShow = useMemo(() => {
        if (searchQuery.trim() !== '') {
            return baseData.filter(item =>
                item.eventName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return baseData;
    }, [baseData, searchQuery]);

    const shouldShowEmpty =
        dataToShow.length === 0 &&
        (activeTab === 'History' || activeTab === 'Active' || searchQuery.trim() !== '');

    const renderAllContactsItem = ({ item }) => (
        <AllContactsCard item={item} />
    );

    const handleClearSearch = () => {
        dispatch(clearSearchQuery());
    };

    const handleAddNewMeeting = () => {
        navigation.navigate('NewMeeting');
    };

    return (
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
                <MeetingHeader
                    activeTab={activeTab}
                    setActiveTab={tab => dispatch(setActiveTab(tab))}
                    filterDate={filterDate}
                    onCancelFilter={() => dispatch(clearFilterDate())}
                    onCalendarPress={() =>
                        navigation.navigate('CalendarScreen', {
                            allContactsData,
                            closestData: closestDataFromAllContacts,
                        })
                    }
                    isActiveTab={activeTab === 'Active'}
                    closestData={closestDataFromAllContacts}
                    hasClosestData={closestDataFromAllContacts.length > 0}
                    hasAllContactsData={isFiltered ? filteredAllContacts.length > 0 : allContactsData.length > 0}
                    searchQuery={searchQuery}
                    onSearchChange={query => dispatch(setSearchQuery(query))}
                    onClearSearch={handleClearSearch}
                />
                <FlatList
                    data={dataToShow}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAllContactsItem}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    contentContainerStyle={{ paddingBottom: 180, paddingHorizontal: 16 }}
                    ListEmptyComponent={shouldShowEmpty ? <EmptyMeetings /> : null}
                />
                {(activeTab === 'Active' || activeTab === 'History') && (
                    <TouchableOpacity style={styles.addMeetingButton} onPress={handleAddNewMeeting}>
                        <Text style={styles.addMeetingButtonText}>Add new meeting</Text>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    topSafeArea: {
        flex: 0,
        backgroundColor: '#131313',
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    addMeetingButton: {
        position: 'absolute',
        bottom: 122,
        left: 16,
        right: 16,
        height: 52,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addMeetingButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#000000',
    },
});
