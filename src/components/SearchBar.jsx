import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SearchSVG from '../assets/meeting/SearchSVG';
import MicrophoneSVG from '../assets/meeting/MicrophoneSVG';
import CancelSVG from '../assets/meeting/CancelSVG';

const SearchBar = ({
    searchQuery,
    onSearchChange,
    onClearSearch,
    onCancel,
    filterActive
}) => {
    return (
        <View style={styles.searchRow}>
            <View style={styles.searchBar}>
                <SearchSVG style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    placeholder="Search"
                    placeholderTextColor="#999999"
                    blurOnSubmit={false}
                    autoCorrect={false}
                />
                {searchQuery !== '' ? (
                    <TouchableOpacity onPress={onClearSearch}>
                        <CancelSVG />
                    </TouchableOpacity>
                ) : (
                    <MicrophoneSVG />
                )}
            </View>
            {filterActive && (
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    searchBar: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#212121',
        borderWidth: 1,
        borderColor: '#57555533',
        paddingHorizontal: 16,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 14,
        color: '#FFFFFF',
        padding: 0,
    },
    cancelButton: {
        marginLeft: 12,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 16,
    },
});

export default SearchBar;
