import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Switch,
    TouchableOpacity,
    ScrollView,
    Text,
    Image,
} from 'react-native';

import NotificationsSVG from '../assets/settings/NotificationsSVG';
import WebsiteSVG from '../assets/settings/WebsiteSVG';
import PolicySVG from '../assets/settings/PolicySVG';
import TermsSVG from '../assets/settings/TermsSVG';
import ArrowRightSVG from '../assets/settings/ArrowRightSVG';
import Header from '../components/Header';

import crown from '../assets/settings/crown.png';

export default function SettingsScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(prev => !prev);

    return (
        <View style={styles.container}>
            <Header title="Settings" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.card} onPress={() => { }}>
                    <View style={styles.cardLeft}>
                        <TermsSVG />
                        <Text style={styles.cardTitle}>Terms of Use</Text>
                    </View>
                    <ArrowRightSVG />
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => { }}>
                    <View style={styles.cardLeft}>
                        <WebsiteSVG />
                        <Text style={styles.cardTitle}>Developer Website</Text>
                    </View>
                    <ArrowRightSVG />
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => { }}>
                    <View style={styles.cardLeft}>
                        <PolicySVG />
                        <Text style={styles.cardTitle}>Privacy Policy</Text>
                    </View>
                    <ArrowRightSVG />
                </TouchableOpacity>

                <View style={styles.card}>
                    <View style={styles.cardLeft}>
                        <NotificationsSVG />
                        <Text style={styles.cardTitle}>Notifications</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#292929', true: '#C9890B' }}
                        thumbColor="#f4f3f4"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <Image source={crown} style={styles.crown} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 16,
    },
    card: {
        height: 68,
        backgroundColor: '#161616',
        borderRadius: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        marginLeft: 12,
        fontFamily: 'SF Pro Text',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF',
    },
    crown: {
        marginTop: 74,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});
