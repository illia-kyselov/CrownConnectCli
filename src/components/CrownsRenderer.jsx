import React from 'react';
import { View, StyleSheet } from 'react-native';
import CrownSVG from '../assets/CrownSVG';

const CrownsRenderer = ({ importance = 0 }) => {
    const total = 5;
    const coloredCount = Math.min(Math.max(importance, 0), total);
    const crowns = [];

    for (let i = 0; i < total; i++) {
        const color = i < coloredCount ? "#C9890B" : "#292929";
        crowns.push(
            <CrownSVG key={i} color={color} style={styles.crownIcon} />
        );
    }

    return <View style={styles.container}>{crowns}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    crownIcon: {
        marginRight: 6,
    },
});

export default CrownsRenderer;
