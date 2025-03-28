import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackSVG from '../assets/ArrowBackSVG';
import PlusSVG from '../assets/meeting/PlusSVG';
import CancelSVG from '../assets/meeting/CancelSVG';
import { useImagePicker } from '../hooks/useImagePicker';
import { addContact, updateContact } from '../store/slices/meetingsSlice';

export default function NewContactScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { pickImage } = useImagePicker();
    const globalTags = useSelector((state) => state.meetings.contactTags);
    const { editing = false, contact } = route.params || {};
    const [name, setName] = useState(editing && contact ? contact.name : '');
    const [phone, setPhone] = useState(editing && contact ? contact.phone : '');
    const [tags, setTags] = useState(editing && contact ? contact.tags : []);
    const [photo, setPhoto] = useState(editing && contact ? contact.imageUrl : null);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        if (tagInput.trim()) {
            const trimmed = tagInput.trim();
            if (!tags.includes(trimmed)) {
                setTags((prev) => [...prev, trimmed]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    };

    const openPhotoPicker = async () => {
        const uri = await pickImage();
        if (uri) setPhoto(uri);
    };

    const handleToggleGlobalTag = (tag) => {
        if (tags.includes(tag)) {
            removeTag(tag);
        } else {
            setTags((prev) => [...prev, tag]);
        }
    };

    const isFormValid = name.trim() && phone.trim();

    const handleSave = () => {
        if (!isFormValid) return;
        const contactData = {
            id: editing && contact ? contact.id : Date.now().toString(),
            name,
            phone,
            tags,
            imageUrl: photo,
        };
        if (editing) {
            dispatch(updateContact(contactData));
            navigation.replace('ContactDetails', { contact: contactData });
        } else {
            dispatch(addContact(contactData));
            navigation.replace('ContactAdded', { newContact: contactData });
        }
    };

    const customTags = tags.filter((tag) => !globalTags.includes(tag));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowBackSVG />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{editing ? 'Edit contact' : 'Add new contact'}</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name</Text>
                    <View style={[styles.inputContainer, name && styles.inputActive]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter name"
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

                    <Text style={styles.label}>Phone number</Text>
                    <View style={[styles.inputContainer, phone && styles.inputActive]}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter phone number"
                            placeholderTextColor="#999999"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                        {phone !== '' && (
                            <TouchableOpacity onPress={() => setPhone('')}>
                                <CancelSVG />
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.label}>Tags</Text>
                    <View style={[styles.inputContainer, { justifyContent: 'space-between' }, tagInput && styles.inputActive]}>
                        <TextInput
                            style={[styles.textInput, { flex: 1 }]}
                            placeholder="Add a tag"
                            placeholderTextColor="#999999"
                            value={tagInput}
                            onChangeText={setTagInput}
                        />
                        <TouchableOpacity onPress={handleAddTag}>
                            <PlusSVG />
                        </TouchableOpacity>
                    </View>

                    {customTags.map((tag, index) => (
                        <View key={index} style={[styles.tagItem, styles.inputActive]}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <TouchableOpacity onPress={() => removeTag(tag)}>
                                <CancelSVG width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.globalTagsContainer}>
                        {globalTags.map((tag, index) => (
                            <TouchableOpacity key={index} onPress={() => handleToggleGlobalTag(tag)}>
                                <View style={[styles.tagItem, styles.globalTagItem, tags.includes(tag) && styles.globalTagItemActive]}>
                                    <Text style={[styles.tagText, tags.includes(tag) && styles.globalTagTextActive]}>{tag}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

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
                    style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={!isFormValid}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: 22,
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
    backButton: {
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
        marginLeft: 16,
    },
    formContainer: {
        marginBottom: 24,
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
        borderRadius: 12,
        paddingHorizontal: 20,
        backgroundColor: '#181818',
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
    tagItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 20,
        backgroundColor: '#181818',
        marginBottom: 24,
        justifyContent: 'space-between',
    },
    tagText: {
        flex: 1,
        color: '#FFFFFF',
    },
    globalTagsContainer: {
        marginBottom: 24,
    },
    globalTagItem: {
        marginRight: 12,
        paddingHorizontal: 16,
        height: 40,
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#181818',
    },
    globalTagItemActive: {
        backgroundColor: '#FFFFFF',
    },
    globalTagTextActive: {
        color: '#181818',
    },
    photoContainer: {
        width: 100,
        height: 100,
        borderRadius: 300,
        borderWidth: 1,
        borderColor: '#0000004D',
        backgroundColor: '#181818',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        position: 'relative',
    },
    photo: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 300,
        resizeMode: 'cover',
    },
    photoCancelButton: {
        position: 'absolute',
        top: -10,
        right: -12,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#181818',
        height: 114,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    saveButton: {
        height: 52,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    saveButtonDisabled: {
        opacity: 0.3,
    },
    saveButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#000000',
    },
});
