import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Modal,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ArrowBackSVG from '../assets/meeting/ArrowBackSVG';
import CalendarFormSVG from '../assets/meeting/CalendarFormSVG';
import TimeSVG from '../assets/meeting/TimeSVG';
import PlusSVG from '../assets/meeting/PlusSVG';
import CancelSVG from '../assets/meeting/CancelSVG';
import CrownSVG from '../assets/meeting/CrownSVG';
import { useDispatch, useSelector } from 'react-redux';
import { addMeeting, updateMeeting } from '../store/slices/meetingsSlice';
import { useDatePicker } from '../hooks/useDatePicker';
import { useTimePicker } from '../hooks/useTimePicker';
import { useImagePicker } from '../hooks/useImagePicker';
import AllContactsCard from '../components/Meeting/AllContactsCard';

export default function NewMeetingScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const contactsStore = useSelector((state) => state.meetings.contacts);

    const editing = route.params?.editing;
    const meetingToEdit = route.params?.meeting;
    const [name, setName] = useState(editing && meetingToEdit ? meetingToEdit.eventName : '');
    const [comments, setComments] = useState(editing && meetingToEdit ? meetingToEdit.comments : '');
    const [selectedContacts, setSelectedContacts] = useState(
        editing && meetingToEdit && meetingToEdit.contactIds
            ? meetingToEdit.contactIds
                .map((id) => contactsStore.find((c) => c.id === id))
                .filter(Boolean)
            : []
    );
    const [importance, setImportance] = useState(editing && meetingToEdit ? meetingToEdit.importance : 0);

    const {
        date,
        show: showDatePicker,
        hide: hideDatePicker,
        handleConfirm: handleConfirmDate,
        setDate,
        isVisible: isDatePickerVisible,
    } = useDatePicker();

    useEffect(() => {
        if (editing && meetingToEdit?.date) {
            setDate(meetingToEdit.date);
        }
    }, [editing, meetingToEdit, setDate]);

    const {
        time: startTime,
        show: showStartTimePicker,
        hide: hideStartTimePicker,
        handleConfirm: handleConfirmStartTime,
        setTime: setStartTime,
        isVisible: isStartTimePickerVisible,
    } = useTimePicker();

    const {
        time: endTime,
        show: showEndTimePicker,
        hide: hideEndTimePicker,
        handleConfirm: handleConfirmEndTime,
        setTime: setEndTime,
        isVisible: isEndTimePickerVisible,
    } = useTimePicker();

    useEffect(() => {
        if (editing && meetingToEdit?.time) {
            const [start, end] = meetingToEdit.time.split(' - ');
            setStartTime(start);
            setEndTime(end);
        }
    }, [editing, meetingToEdit, setStartTime, setEndTime]);

    const { pickImage } = useImagePicker();
    const [photo, setPhoto] = useState(editing && meetingToEdit ? meetingToEdit.imageUrl : null);

    const [contactsModalVisible, setContactsModalVisible] = useState(false);

    const openContactsModal = () => {
        setContactsModalVisible(true);
    };

    const closeContactsModal = () => {
        setContactsModalVisible(false);
    };

    const openPhotoPicker = async () => {
        const uri = await pickImage();
        if (uri) setPhoto(uri);
    };

    const removeContact = (contactId) => {
        setSelectedContacts(selectedContacts.filter((c) => c.id !== contactId));
    };

    const toggleContactSelection = (contact) => {
        const exists = selectedContacts.find((c) => c.id === contact.id);
        if (exists) {
            setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
        } else {
            setSelectedContacts([...selectedContacts, contact]);
        }
    };

    const isFormValid = name && date && startTime && endTime;

    const handleSave = () => {
        if (!isFormValid) return;

        const meetingData = {
            id: editing && meetingToEdit ? meetingToEdit.id : Date.now().toString(),
            eventName: name,
            date,
            time: `${startTime} - ${endTime}`,
            contactIds: selectedContacts.map((c) => c.id),
            comments,
            imageUrl: photo,
            importance,
        };

        if (editing) {
            dispatch(updateMeeting(meetingData));
        } else {
            dispatch(addMeeting(meetingData));
        }

        navigation.replace('MeetingSuccess', { meeting: meetingData });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBackSVG />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{editing ? 'Edit Meeting' : 'Add new meeting'}</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name</Text>
                    <View style={[styles.inputContainer, name && styles.inputActive]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Task name"
                            placeholderTextColor="#999999"
                            value={name}
                            onChangeText={setName}
                        />
                        {name !== '' && (
                            <TouchableOpacity onPress={() => setName('')}>
                                <CancelSVG />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.label}>Comments</Text>
                    <View style={[styles.inputContainer, comments && styles.inputActive]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Task name"
                            placeholderTextColor="#999999"
                            value={comments}
                            onChangeText={setComments}
                        />
                        {comments !== '' && (
                            <TouchableOpacity onPress={() => setComments('')}>
                                <CancelSVG />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity
                        style={[styles.dateInputContainer, date && styles.inputActive]}
                        onPress={showDatePicker}
                    >
                        <CalendarFormSVG style={styles.icon} />
                        <Text style={date ? styles.dateText : styles.placeholderText}>
                            {date ? date : 'DD.MM.YY'}
                        </Text>
                        {date !== '' && (
                            <TouchableOpacity onPress={() => setDate('')}>
                                <CancelSVG />
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.label}>Time</Text>
                    <View style={styles.timeRow}>
                        <TouchableOpacity
                            style={[styles.timeInputContainer, startTime && styles.inputActive]}
                            onPress={showStartTimePicker}
                        >
                            <TimeSVG style={styles.icon} />
                            <Text style={startTime ? styles.timeText : styles.placeholderText}>
                                {startTime ? startTime : '00:00'}
                            </Text>
                            {startTime !== '' && (
                                <TouchableOpacity onPress={() => setStartTime('')}>
                                    <CancelSVG />
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                        <View style={{ width: 12 }} />
                        <TouchableOpacity
                            style={[styles.timeInputContainer, endTime && styles.inputActive]}
                            onPress={showEndTimePicker}
                        >
                            <TimeSVG style={styles.icon} />
                            <Text style={endTime ? styles.timeText : styles.placeholderText}>
                                {endTime ? endTime : '00:00'}
                            </Text>
                            {endTime !== '' && (
                                <TouchableOpacity onPress={() => setEndTime('')}>
                                    <CancelSVG />
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contactsHeaderRow}>
                        <Text style={styles.label}>Contacts</Text>
                        <TouchableOpacity onPress={openContactsModal}>
                            <PlusSVG />
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
                        {selectedContacts.map((contact) => (
                            <View key={contact.id} style={{ marginRight: 8, position: 'relative' }}>
                                <AllContactsCard item={contact} isContact />
                            </View>
                        ))}
                    </ScrollView>
                    <Text style={styles.label}>Importance</Text>
                    <View style={styles.importanceRow}>
                        {[1, 2, 3, 4, 5].map((level) => (
                            <TouchableOpacity key={level} onPress={() => setImportance(level)}>
                                <CrownSVG
                                    fill={importance >= level ? '#C9890B' : '#292929'}
                                    style={{ marginRight: level < 5 ? 18 : 0 }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.label}>Photo</Text>
                    <TouchableOpacity style={styles.photoContainer} onPress={openPhotoPicker}>
                        {photo ? (
                            <>
                                <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
                                <TouchableOpacity style={styles.photoCancelButton} onPress={() => setPhoto(null)}>
                                    <CancelSVG width={28} height={28} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <PlusSVG />
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        !isFormValid && styles.saveButtonDisabled,
                        !isFormValid && { opacity: 0.5 },
                    ]}
                    disabled={!isFormValid}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>{editing ? 'Done' : 'Save'}</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                display="spinner"
                isDarkModeEnabled={true}
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                textColor="#ffffff"
                pickerContainerStyleIOS={styles.customPickerContainer}
            />
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                display="spinner"
                isDarkModeEnabled={true}
                onConfirm={handleConfirmStartTime}
                onCancel={hideStartTimePicker}
                textColor="#ffffff"
                pickerContainerStyleIOS={styles.customPickerContainer}
            />
            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                display="spinner"
                isDarkModeEnabled={true}
                onConfirm={handleConfirmEndTime}
                onCancel={hideEndTimePicker}
                textColor="#ffffff"
                pickerContainerStyleIOS={styles.customPickerContainer}
            />
            <Modal
                animationType="slide"
                transparent={false}
                visible={contactsModalVisible}
                onRequestClose={closeContactsModal}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Contacts</Text>
                        <TouchableOpacity onPress={closeContactsModal}>
                            <Text style={styles.modalDoneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        {contactsStore.map((contact) => (
                            <TouchableOpacity key={contact.id} onPress={() => toggleContactSelection(contact)}>
                                <AllContactsCard
                                    item={contact}
                                    isSelectable
                                    isSelected={!!selectedContacts.find((c) => c.id === contact.id)}
                                    onToggleSelect={() => toggleContactSelection(contact)}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 66,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
        marginLeft: 16,
    },
    label: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 14,
        padding: 20,
        backgroundColor: '#131313',
        marginBottom: 24,
    },
    textInput: {
        flex: 1,
        color: '#FFFFFF',
    },
    inputActive: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 14,
        padding: 16,
        backgroundColor: '#131313',
        marginBottom: 24,
    },
    icon: {
        marginRight: 12,
    },
    placeholderText: {
        color: '#a9a9a9',
        flex: 1,
    },
    dateText: {
        color: '#FFFFFF',
        flex: 1,
    },
    timeRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timeInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 14,
        padding: 16,
        backgroundColor: '#131313',
    },
    timeText: {
        color: '#FFFFFF',
        flex: 1,
    },
    contactsHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    importanceRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    photoContainer: {
        width: 100,
        height: 100,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#0000004D',
        backgroundColor: '#131313',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        position: 'relative',
    },
    photo: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 18,
        resizeMode: 'cover',
    },
    photoCancelButton: {
        position: 'absolute',
        top: -10,
        right: -12,
    },
    removeContactButton: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#131313',
        borderRadius: 14,
        padding: 4,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#131313',
        height: 114,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    saveButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    saveButtonDisabled: {
        backgroundColor: '#d3d3d3',
    },
    saveButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#000000',
    },
    customPickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        marginBottom: 24,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    modalTitle: {
        fontFamily: 'SF Pro',
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    modalDoneText: {
        fontFamily: 'SF Pro',
        fontSize: 16,
        color: '#e19100',
    },
    modalContent: {
        padding: 16,
        gap: 16,
    },
});
