import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Linking,
    Image 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ArrowBackSVG from '../assets/ArrowBackSVG';
import EditSVG from '../assets/meeting/EditSVG';
import ArrowRightSVG from '../assets/contacts/ArrowRightSVG';
import CrownSVG from '../assets/meeting/CrownSVG';
import PlusSVG from '../assets/meeting/PlusSVG';
import CancelSVG from '../assets/meeting/CancelSVG';
import { deleteContact, updateContact } from '../store/slices/meetingsSlice';

export default function ContactDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { contact } = route.params || {};
    const {
        id,
        name = 'Name of contact',
        phone = '+7 812 952 52 52',
        tags = [],
        importance: initialImportance = 3,
        comments: initialComments = 'Some comments...',
        facts: initialFacts = [],
        interests: initialInterests = [],
        work: initialWork = [],
        whereMeet: initialWhereMeet = [],
        imageUrl,
    } = contact || {};

    const [importance, setImportance] = useState(initialImportance);
    const [comments, setComments] = useState(initialComments);
    const [editingComment, setEditingComment] = useState(false);
    const [commentInput, setCommentInput] = useState(initialComments);

    const [facts, setFacts] = useState(initialFacts);
    const [factsInput, setFactsInput] = useState('');

    const [interests, setInterests] = useState(initialInterests);
    const [interestsInput, setInterestsInput] = useState('');

    const [work, setWork] = useState(initialWork);
    const [workInput, setWorkInput] = useState('');

    const [whereMeet, setWhereMeet] = useState(initialWhereMeet);
    const [whereMeetInput, setWhereMeetInput] = useState('');

    const [menuVisible, setMenuVisible] = useState(false);

    const handleGoBack = () => {
        navigation.replace('Main', { screen: 'Contacts' });
    };

    const handleOpenMenu = () => {
        setMenuVisible(true);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    const handleCall = () => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleNewMeeting = () => {
        navigation.navigate('NewMeeting');
    };

    const addFact = () => {
        if (factsInput.trim()) {
            const newFacts = [...facts, factsInput.trim()];
            setFacts(newFacts);
            setFactsInput('');
            dispatch(updateContact({ id, facts: newFacts }));
        }
    };

    const removeFact = factToRemove => {
        const newFacts = facts.filter(f => f !== factToRemove);
        setFacts(newFacts);
        dispatch(updateContact({ id, facts: newFacts }));
    };

    const addInterest = () => {
        if (interestsInput.trim()) {
            const newInterests = [...interests, interestsInput.trim()];
            setInterests(newInterests);
            setInterestsInput('');
            dispatch(updateContact({ id, interests: newInterests }));
        }
    };

    const removeInterest = item => {
        const newInterests = interests.filter(it => it !== item);
        setInterests(newInterests);
        dispatch(updateContact({ id, interests: newInterests }));
    };

    const addWork = () => {
        if (workInput.trim()) {
            const newWork = [...work, workInput.trim()];
            setWork(newWork);
            setWorkInput('');
            dispatch(updateContact({ id, work: newWork }));
        }
    };

    const removeWork = item => {
        const newWork = work.filter(it => it !== item);
        setWork(newWork);
        dispatch(updateContact({ id, work: newWork }));
    };

    const addWhereMeet = () => {
        if (whereMeetInput.trim()) {
            const newWhereMeet = [...whereMeet, whereMeetInput.trim()];
            setWhereMeet(newWhereMeet);
            setWhereMeetInput('');
            dispatch(updateContact({ id, whereMeet: newWhereMeet }));
        }
    };

    const removeWhereMeet = item => {
        const newWhereMeet = whereMeet.filter(it => it !== item);
        setWhereMeet(newWhereMeet);
        dispatch(updateContact({ id, whereMeet: newWhereMeet }));
    };

    const handleModalEdit = () => {
        setMenuVisible(false);
        navigation.navigate('NewContact', { contact, editing: true });
    };

    const handleDelete = () => {
        dispatch(deleteContact(id));
        setMenuVisible(false);
        navigation.goBack();
    };

    const handleCommentEdit = () => {
        setEditingComment(true);
    };

    const handleCommentSave = () => {
        setComments(commentInput);
        setEditingComment(false);
        dispatch(updateContact({ id, comments: commentInput }));
    };

    useEffect(() => {
        dispatch(updateContact({ id, importance }));
    }, [importance]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <ArrowBackSVG />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Contact</Text>
                    <TouchableOpacity onPress={handleOpenMenu}>
                        <EditSVG />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarContainer}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.avatarPlaceholder} />
                    ) : (
                        <View style={styles.avatarPlaceholder} />
                    )}
                </View>
                <Text style={styles.contactName}>{name}</Text>
                <TouchableOpacity style={styles.phoneContainer} onPress={handleCall}>
                    <Text style={styles.phoneText}>{phone}</Text>
                    <ArrowRightSVG />
                </TouchableOpacity>
                <View style={styles.commentsRow}>
                    <Text style={styles.commentsLabel}>Comments</Text>
                    <TouchableOpacity
                        style={styles.commentEditButton}
                        onPress={handleCommentEdit}
                    >
                        <EditSVG />
                    </TouchableOpacity>
                </View>
                {editingComment ? (
                    <TextInput
                        style={[
                            styles.inputContainer,
                            styles.inputActive,
                            styles.commentInput,
                        ]}
                        value={commentInput}
                        onChangeText={setCommentInput}
                        onEndEditing={handleCommentSave}
                        autoFocus
                    />
                ) : (
                    <Text style={styles.commentsText}>{comments}</Text>
                )}
                <Text style={styles.importanceLabel}>Importance</Text>
                <View style={styles.importanceRow}>
                    {[1, 2, 3, 4, 5].map(level => (
                        <TouchableOpacity key={level} onPress={() => setImportance(level)}>
                            <CrownSVG
                                fill={importance >= level ? '#C9890B' : '#292929'}
                                style={{ marginRight: level < 5 ? 18 : 0 }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.blockHeader}>
                    <Text style={styles.blockHeaderText}>Facts</Text>
                    <TouchableOpacity onPress={addFact}>
                        <PlusSVG />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, factsInput && styles.inputActive]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task name"
                        placeholderTextColor="#999"
                        value={factsInput}
                        onChangeText={setFactsInput}
                    />
                    <TouchableOpacity style={styles.iconSpacing} onPress={addFact}>
                        <EditSVG />
                    </TouchableOpacity>
                </View>
                {facts.map((fact, index) => (
                    <View key={index} style={[styles.inputContainer, styles.inputActive]}>
                        <Text style={styles.inputText}>{fact}</Text>
                        <TouchableOpacity
                            style={styles.iconSpacing}
                            onPress={() => removeFact(fact)}
                        >
                            <CancelSVG />
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.blockHeader}>
                    <Text style={styles.blockHeaderText}>Interests</Text>
                    <TouchableOpacity onPress={addInterest}>
                        <PlusSVG />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, interestsInput && styles.inputActive]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task name"
                        placeholderTextColor="#999"
                        value={interestsInput}
                        onChangeText={setInterestsInput}
                    />
                    <TouchableOpacity style={styles.iconSpacing} onPress={addInterest}>
                        <EditSVG />
                    </TouchableOpacity>
                </View>
                {interests.map((item, index) => (
                    <View key={index} style={[styles.inputContainer, styles.inputActive]}>
                        <Text style={styles.inputText}>{item}</Text>
                        <TouchableOpacity
                            style={styles.iconSpacing}
                            onPress={() => removeInterest(item)}
                        >
                            <CancelSVG />
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.blockHeader}>
                    <Text style={styles.blockHeaderText}>Work</Text>
                    <TouchableOpacity onPress={addWork}>
                        <PlusSVG />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, workInput && styles.inputActive]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task name"
                        placeholderTextColor="#999"
                        value={workInput}
                        onChangeText={setWorkInput}
                    />
                    <TouchableOpacity style={styles.iconSpacing} onPress={addWork}>
                        <EditSVG />
                    </TouchableOpacity>
                </View>
                {work.map((item, index) => (
                    <View key={index} style={[styles.inputContainer, styles.inputActive]}>
                        <Text style={styles.inputText}>{item}</Text>
                        <TouchableOpacity
                            style={styles.iconSpacing}
                            onPress={() => removeWork(item)}
                        >
                            <CancelSVG />
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.blockHeader}>
                    <Text style={styles.blockHeaderText}>Where you meet?</Text>
                    <TouchableOpacity onPress={addWhereMeet}>
                        <PlusSVG />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, whereMeetInput && styles.inputActive]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task name"
                        placeholderTextColor="#999"
                        value={whereMeetInput}
                        onChangeText={setWhereMeetInput}
                    />
                    <TouchableOpacity style={styles.iconSpacing} onPress={addWhereMeet}>
                        <EditSVG />
                    </TouchableOpacity>
                </View>
                {whereMeet.map((item, index) => (
                    <View key={index} style={[styles.inputContainer, styles.inputActive]}>
                        <Text style={styles.inputText}>{item}</Text>
                        <TouchableOpacity
                            style={styles.iconSpacing}
                            onPress={() => removeWhereMeet(item)}
                        >
                            <CancelSVG />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleCall}>
                    <Text style={styles.addButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleNewMeeting}>
                    <Text style={styles.closeButtonText}>New meeting</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent
                visible={menuVisible}
                animationType="fade"
                onRequestClose={handleCloseMenu}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={handleCloseMenu}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalButtonWrapper}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleModalEdit}
                            >
                                <Text style={styles.modalButtonTextEdit}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonBorderTop]}
                                onPress={handleDelete}
                            >
                                <Text style={styles.modalButtonTextDelete}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[styles.modalButtonCancel, { marginTop: 8 }]}
                            onPress={handleCloseMenu}
                        >
                            <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 160,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF',
    },
    avatarContainer: {
        alignItems: 'flex-start',
        marginTop: 12,
        marginBottom: 16,
    },
    avatarPlaceholder: {
        width: 101,
        height: 101,
        borderRadius: 200,
        backgroundColor: '#FFFFFF',
    },
    contactName: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 16,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    phoneText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#e19100',
        marginRight: 4,
    },
    commentsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    commentsLabel: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    commentEditButton: {
        marginLeft: 12,
    },
    commentsText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 32,
    },
    commentInput: {
        padding: 8,
        color: '#FFFFFF',
    },
    importanceLabel: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    importanceRow: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    blockHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    blockHeaderText: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 18,
        color: '#FFFFFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        height: 52,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    inputText: {
        flex: 1,
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
    },
    inputActive: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    iconSpacing: {
        marginLeft: 12,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#131313',
        padding: 16,
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    addButton: {
        height: 52,
        borderRadius: 14,
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
        height: 52,
        borderRadius: 14,
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
