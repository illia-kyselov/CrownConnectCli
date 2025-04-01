import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DotSVG from '../../assets/meeting/DotSVG';
import ArrowRightSVG from '../../assets/settings/ArrowRightSVG';
import PlusSVG from '../../assets/meeting/PlusSVG';
import DoneSVG from '../../assets/meeting/DoneSVG';
import RightActions from './RightActions';
import CrownsRenderer from '../CrownsRenderer';

export default function AllContactsCard({
    item,
    isContact,
    isContactsCard,
    isSelectable,
    isSelected,
    onToggleSelect
}) {
    const navigation = useNavigation();

    const onPressCard = () => {
        if (!isContact && !isSelectable) {
            navigation.navigate('MeetingDetails', { itemId: item.id });
        }
        if (isContactsCard) {
            navigation.replace('ContactDetails', { contact: item });
        }
    };

    const cardContent = (
        <View style={styles.allContactsCard}>
            <View style={styles.cardRow}>
                <CrownsRenderer importance={item.importance || 3} />
                <View style={{ flex: 1 }} />
                {!isSelectable && !isContact && !isContactsCard && (
                    <Text style={styles.contactsText}>
                        {item.contactIds ? item.contactIds.length : 0} contacts
                    </Text>
                )}
            </View>
            <View style={styles.rowBetween}>
                <Text style={styles.eventName}>
                    {isSelectable
                        ? item.name
                        : isContact || isContactsCard
                            ? item.name
                            : item.eventName}
                </Text>
                {isSelectable && (
                    <TouchableOpacity onPress={onToggleSelect}>
                        {isSelected ? <DoneSVG /> : <PlusSVG />}
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.dateRow}>
                {(isContact || isContactsCard || isSelectable) ? (
                    <Text style={styles.dateText}>{item.phone}</Text>
                ) : (
                    <>
                        <Text style={styles.dateText}>{item.date}</Text>
                        <View style={{ marginHorizontal: 6 }}>
                            <DotSVG />
                        </View>
                        <Text style={styles.dateText}>{item.time}</Text>
                    </>
                )}
                <View style={{ flex: 1 }} />
                {!isSelectable && !isContact && isContactsCard && <ArrowRightSVG />}
            </View>
        </View>
    );

    if (isContactsCard) {
        return (
            <Swipeable renderRightActions={() => <RightActions itemId={item.id} isContactsCard />}>
                <TouchableOpacity activeOpacity={1} onPress={onPressCard}>
                    {cardContent}
                </TouchableOpacity>
            </Swipeable>
        );
    }

    if (isContact || isSelectable) {
        return cardContent;
    }

    return (
        <Swipeable renderRightActions={() => <RightActions itemId={item.id} meetingItem={item} />}>
            <TouchableOpacity activeOpacity={1} onPress={onPressCard}>
                {cardContent}
            </TouchableOpacity>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    allContactsCard: {
        minHeight: 92,
        minWidth: 320,
        borderRadius: 18,
        backgroundColor: '#1a1a1a',
        padding: 16,
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    contactsText: {
        marginLeft: 'auto',
        fontFamily: 'SF Pro Display',
        fontWeight: '400',
        fontSize: 12,
        color: '#a9a9a9',
    },
    eventName: {
        fontFamily: 'SF Pro Display',
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'SF Pro Display',
        fontWeight: '400',
        fontSize: 12,
        color: '#a9a9a9',
    },
});
