import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EmptyMeetings({ text = 'There aren’t any meetings yet, it will be there then you get them' }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/meeting/crown.png')} style={styles.image} />
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 84,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 86,
    },
    image: {
        resizeMode: 'contain',
    },
    text: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 16,
        color: '#FFFFFF',
        maxWidth: 247,
        textAlign: 'center',
    }
});
