import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import AllContactsCard from '../components/Meeting/AllContactsCard';
import { useNavigation } from '@react-navigation/native';
import EmptyMeetings from '../components/EmptyMeetings';

export default function ContactsScreen() {
    const navigation = useNavigation();
    const { contacts, allContactsData, contactTags } = useSelector(
        (state) => state.meetings
    );
    const [activeTags, setActiveTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Contacts');
    const filteredContacts = searchQuery.trim() === ''
        ? activeTags.length === 0
            ? contacts
            : contacts.filter(contact =>
                contact.tags && activeTags.every(tag => contact.tags.includes(tag))
            )
        : contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const filteredMeetings = searchQuery.trim() === ''
        ? allContactsData
        : allContactsData.filter(meeting =>
            meeting.eventName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setActiveTab('Contacts');
        }
    }, [searchQuery]);

    const renderFilterBar = () => {
        if (searchQuery.trim() !== '') {
            return (
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'Contacts' && styles.tabButtonActive
                        ]}
                        onPress={() => setActiveTab('Contacts')}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 'Contacts' && styles.tabButtonTextActive
                            ]}
                        >
                            Contacts
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'Meetings' && styles.tabButtonActive
                        ]}
                        onPress={() => setActiveTab('Meetings')}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 'Meetings' && styles.tabButtonTextActive
                            ]}
                        >
                            Meetings
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={contactTags}
                    horizontal
                    keyExtractor={(item, index) => `tag-${index}`}
                    renderItem={renderTagItem}
                    ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 16 }}
                />
            );
        }
    };

    const toggleTag = (tag) => {
        setActiveTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const renderTagItem = ({ item }) => {
        const isActive = activeTags.includes(item);
        return (
            <TouchableOpacity onPress={() => toggleTag(item)}>
                <View style={[styles.tagItem, isActive && styles.activeTagItem]}>
                    <Text style={[styles.tagItemText, isActive && styles.activeTagItemText]}>
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const dataToShow =
        activeTab === 'Contacts' ? filteredContacts : filteredMeetings;

    const renderEmptySearchResults = () => {
        const isContacts = activeTab === 'Contacts';
        const message = isContacts
            ? 'There aren’t any contacts for your search, you can add it now'
            : 'There aren’t any meetings for your search, you can add it now';
        const buttonText = isContacts ? 'Add new contact' : 'Add new meeting';
        const onPressButton = () => {
            navigation.navigate(isContacts ? 'NewContact' : 'NewMeeting');
        };

        return (
            <View style={styles.emptyResultsContainer}>
                <Image
                    source={require('../assets/contacts/crown.png')}
                    style={styles.emptyImage}
                    resizeMode="contain"
                />
                <View style={styles.emptyTextWrapper}>
                    <Text style={styles.emptyText}>{message}</Text>
                </View>
                <TouchableOpacity style={styles.emptyButton} onPress={onPressButton}>
                    <Text style={styles.emptyButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    function EmptyMeetingsCustomText() {
        return (
            <View style={styles.emptyMeetingsContainer}>
                <EmptyMeetings text={'There aren’t any contacts you added yet, you can do it now'} />
            </View>
        );
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#181818' }} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Crown contacts</Text>
                    <View style={{ marginBottom: 16 }}>
                        <SearchBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onClearSearch={() => setSearchQuery('')}
                            onCancel={() => setSearchQuery('')}
                            filterActive={false}
                        />
                    </View>
                    {renderFilterBar()}
                </View>
                <View style={styles.contactsContainer}>
                    {dataToShow.length === 0 ? (
                        searchQuery.trim() !== ''
                            ? renderEmptySearchResults()
                            : <EmptyMeetingsCustomText />
                    ) : (
                        <FlatList
                            data={dataToShow}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={{ marginBottom: 12 }}>
                                    <AllContactsCard item={item} isContactsCard />
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 140 }}
                        />
                    )}
                </View>
                {searchQuery.trim() === '' && (
                    <TouchableOpacity
                        style={styles.addMeetingButton}
                        onPress={() => navigation.navigate('NewContact')}
                    >
                        <Text style={styles.addMeetingButtonText}>Add new contact</Text>
                    </TouchableOpacity>
                )}

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        backgroundColor: '#181818',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        padding: 16,
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '860',
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    contactsContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    tagItem: {
        height: 35,
        borderRadius: 12,
        backgroundColor: '#292929',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagItemText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 16,
        color: '#999999',
    },
    activeTagItem: {
        backgroundColor: '#FFFFFF',
    },
    activeTagItemText: {
        color: '#181818',
    },
    tabContainer: {
        height: 40,
        borderRadius: 12,
        backgroundColor: '#292929',
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonActive: {
        borderWidth: 0.5,
        borderColor: '#0000000A',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    tabButtonText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 13,
        color: '#FFFFFF',
    },
    tabButtonTextActive: {
        fontFamily: 'SF Pro',
        fontWeight: '590',
        fontSize: 13,
        color: '#181818',
    },
    emptyResultsContainer: {
        marginTop: 56,
        alignItems: 'center',
    },
    emptyImage: {
        width: 80,
        height: 80,
        marginBottom: 6,
    },
    emptyTextWrapper: {
        maxWidth: 247,
        marginBottom: 24,
    },
    emptyText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    emptyButton: {
        width: 169,
        height: 32,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#181818',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 12,
        color: '#FFFFFF',
    },
    emptyMeetingsContainer: {
        alignItems: 'center',
        marginTop: 86,
    },
    defaultEmptyText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        maxWidth: 247,
    },
    addMeetingButton: {
        position: 'absolute',
        bottom: 122,
        left: 16,
        right: 16,
        height: 52,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addMeetingButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#000000'
    }
});
