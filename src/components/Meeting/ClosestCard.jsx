import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CrownsSVG from '../../assets/meeting/CrownsSVG';
import DotSVG from '../../assets/meeting/DotSVG';
import ArrowRightSVG from '../../assets/settings/ArrowRightSVG';

export default function ClosestCard({ item }) {
    const navigation = useNavigation();

    const onPressCard = () => {
        navigation.navigate('MeetingDetails', { itemId: item.id });
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPressCard}>
            <View style={styles.closestCard}>
                <View style={styles.closestCardRow}>
                    <CrownsSVG />
                    <View style={{ flex: 1 }} />
                    <Text style={styles.contactsText}>
                        {item.contactIds ? item.contactIds.length : 0} contacts
                    </Text>
                </View>
                <Text style={styles.eventName}>{item.eventName}</Text>
                <View style={styles.dateRow}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <View style={{ marginHorizontal: 6 }}>
                        <DotSVG />
                    </View>
                    <Text style={styles.dateText}>{item.time}</Text>
                    <View style={{ flex: 1 }} />
                    <ArrowRightSVG />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    closestCard: {
        width: 320,
        height: 92,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: '#151515',
        padding: 16,
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    closestCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactsText: {
        marginLeft: 'auto',
        fontFamily: 'SF Pro Display',
        fontWeight: '400',
        fontSize: 12,
        color: '#999999',
    },
    eventName: {
        fontFamily: 'SF Pro Display',
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF',
        marginVertical: 6,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'SF Pro Display',
        fontWeight: '400',
        fontSize: 12,
        color: '#999999',
    },
});
