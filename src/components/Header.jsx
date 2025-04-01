import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { height: 65 + insets.top }]}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#131313',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '900',
        fontSize: 28,
        color: '#FFFFFF',
    },
});
