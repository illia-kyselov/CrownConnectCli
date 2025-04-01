import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { deleteMeeting } from '../store/slices/meetingsSlice';
import EditSVG from '../assets/meeting/EditSVG';
import ArrowBackSVG from '../assets/meeting/ArrowBackSVG';
import AllContactsCard from '../components/Meeting/AllContactsCard';

export default function MeetingDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { itemId } = route.params || {};

    const meetingItem = useSelector(state => {
        const fromAll = state.meetings.allContactsData.find(m => m.id === itemId);
        if (fromAll) return fromAll;
        return state.meetings.closestData.find(m => m.id === itemId);
    });

    const contacts = useSelector(state => state.meetings.contacts);

    const eventContacts =
        meetingItem && meetingItem.contactIds
            ? contacts.filter(contact => meetingItem.contactIds.includes(contact.id))
            : [];

    const [menuVisible, setMenuVisible] = useState(false);

    if (!meetingItem) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff' }}>Meeting not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleEdit = () => {
        navigation.navigate('NewMeeting', {
            editing: true,
            meeting: meetingItem,
        });
    };

    const handleMeetingTookPlace = () => {
        setMenuVisible(true);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    const handleDelete = () => {
        dispatch(deleteMeeting(meetingItem.id));
        setMenuVisible(false);
        navigation.goBack();
    };

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#000' }} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <ArrowBackSVG />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Meeting</Text>
                    <TouchableOpacity onPress={handleEdit}>
                        <EditSVG />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 120 }}>
                    {meetingItem.imageUrl ? (
                        <Image source={{ uri: meetingItem.imageUrl }} style={styles.imageBlock} />
                    ) : null}

                    <Text style={styles.meetingTitle}>{meetingItem.eventName}</Text>
                    <View style={styles.dateTimeRow}>
                        <Text style={styles.dateTimeText}>{meetingItem.date}</Text>
                        <View style={{ flex: 1 }} />
                        <Text style={styles.dateTimeText}>{meetingItem.time}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Connected contacts</Text>
                    <ScrollView
                        horizontal
                        style={{ marginBottom: 24 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {eventContacts.map((contact, index) => (
                            <View
                                key={contact.id}
                                style={{ marginRight: index === eventContacts.length - 1 ? 0 : 8 }}
                            >
                                <AllContactsCard item={contact} isContact />
                            </View>
                        ))}
                    </ScrollView>

                    <Text style={styles.sectionTitle}>Comments</Text>
                    <Text style={styles.commentsText}>
                        {meetingItem.comments ? meetingItem.comments : 'No comments available.'}
                    </Text>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomButton} onPress={handleMeetingTookPlace}>
                        <Text style={styles.bottomButtonText}>Meeting took place</Text>
                    </TouchableOpacity>
                </View>

                <Modal transparent visible={menuVisible} animationType="fade" onRequestClose={handleCloseMenu}>
                    <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleCloseMenu}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalButtonWrapper}>
                                <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                                    <Text style={styles.modalButtonTextEdit}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorderTop]}
                                    onPress={handleDelete}
                                >
                                    <Text style={styles.modalButtonTextDelete}>Delete</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={[styles.modalButtonCancel, { marginTop: 8 }]} onPress={handleCloseMenu}>
                                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF',
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 18,
    },
    imageBlock: {
        width: '100%',
        height: 323,
        borderRadius: 24,
        marginBottom: 12,
    },
    meetingTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    dateTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dateTimeText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 16,
        color: '#a9a9a9',
    },
    sectionTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    commentsText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#131313',
        paddingVertical: 26,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    bottomButton: {
        width: '100%',
        height: 48,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#181818',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#212121',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        paddingBottom: 16,
        paddingTop: 8,
        paddingHorizontal: 12,
    },
    modalButtonWrapper: {
        backgroundColor: '#212121',
        borderRadius: 16,
        overflow: 'hidden',
    },
    modalButton: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonBorderTop: {
        borderTopWidth: 0.5,
        borderColor: '#3A3A3A',
    },
    modalButtonTextEdit: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 17,
        color: '#FFFFFF',
    },
    modalButtonTextDelete: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 17,
        color: '#FF3B30',
    },
    modalButtonCancel: {
        backgroundColor: '#212121',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    modalButtonTextCancel: {
        fontFamily: 'SF Pro',
        fontWeight: '590',
        fontSize: 17,
        color: '#FFFFFF',
    },
});
