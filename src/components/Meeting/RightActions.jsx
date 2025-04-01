import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import DeleteSVG from '../../assets/settings/DeleteSVG';
import EditSVG from '../../assets/settings/EditSVG';
import { deleteContact, deleteMeeting } from '../../store/slices/meetingsSlice';
import { useNavigation } from '@react-navigation/native';

export default function RightActions({ itemId, isContactsCard, meetingItem }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleDelete = () => {
        if (isContactsCard) {
            dispatch(deleteContact(itemId));
        } else {
            dispatch(deleteMeeting(itemId));
        }
    };

    const handleEdit = () => {
        navigation.navigate('NewMeeting', {
            editing: true,
            meeting: meetingItem,
        });
    };

    return (
        <View style={styles.rightActionsContainer}>
            <TouchableOpacity style={styles.actionButtonEdit} onPress={handleEdit}>
                <EditSVG />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonDelete} onPress={handleDelete}>
                <DeleteSVG />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    rightActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButtonEdit: {
        height: 102,
        width: 92,
        marginLeft: -20,
        zIndex: 2,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonDelete: {
        width: 92,
        height: 102,
        marginLeft: -20,
        zIndex: 1,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
