import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackSVG from '../assets/ArrowBackSVG';
import ContactsImage from '../assets/contacts/contacts.png';

export default function ContactAddedScreen() {
    const navigation = useNavigation();

    const handleClose = () => {
        navigation.navigate('Main', {
            screen: 'Contacts'
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContent}>
                <TouchableOpacity onPress={handleClose} style={styles.arrowButton}>
                    <ArrowBackSVG />
                </TouchableOpacity>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Contact is successfully added</Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={ContactsImage} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
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
        paddingTop: 22,
        justifyContent: 'space-between',
    },
    arrowButton: {
        paddingLeft: 16,
    },
    messageContainer: {
        marginTop: 22,
        marginLeft: 27,
        marginRight: 37,
        maxWidth: 326,
    },
    messageText: {
        fontFamily: 'SF Pro',
        fontWeight: '700',
        fontSize: 44,
        color: '#FFFFFF',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 36,
    },
    image: {
        width: 200,
        height: 200,
    },
    bottomContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    closeButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    closeButtonText: {
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#000000',
    },
});
