import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import CalendarSVG from '../../assets/meeting/CalendarSVG';
import ClosestCard from './ClosestCard';
import SearchBar from '../SearchBar';

export default function MeetingHeader({
    activeTab,
    setActiveTab,
    filterDate,
    onCancelFilter,
    onCalendarPress,
    isActiveTab,
    closestData,
    hasClosestData,
    hasAllContactsData,
    searchQuery,
    onSearchChange,
    onClearSearch,
    hasHistoryData
}) {
    const handleCancel = () => {
        onClearSearch();
        if (filterDate) {
            onCancelFilter();
        }
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.headerTitle}>Crown meeting</Text>
                    <TouchableOpacity onPress={onCalendarPress}>
                        <CalendarSVG />
                    </TouchableOpacity>
                </View>
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                    onClearSearch={onClearSearch}
                    onCancel={handleCancel}
                    filterActive={filterDate || searchQuery.trim() !== ''}
                />
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'Active' && styles.tabButtonActive
                        ]}
                        onPress={() => setActiveTab('Active')}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 'Active' && styles.tabButtonTextActive
                            ]}
                        >
                            Active
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'History' && styles.tabButtonActive
                        ]}
                        onPress={() => setActiveTab('History')}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === 'History' && styles.tabButtonTextActive
                            ]}
                        >
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                {searchQuery.trim() !== '' ? (
                    <Text style={styles.sectionTitle}>Results</Text>
                ) : (
                    isActiveTab ? (
                        !filterDate ? (
                            <>
                                {hasClosestData && (
                                    <>
                                        <Text style={styles.sectionTitle}>Closest</Text>
                                        <FlatList
                                            horizontal
                                            data={closestData}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item }) => <ClosestCard item={item} />}
                                            showsHorizontalScrollIndicator={false}
                                            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                                            style={{ marginBottom: 24 }}
                                        />
                                    </>
                                )}
                                {hasAllContactsData && (
                                    <Text style={styles.sectionTitle}>All contacts</Text>
                                )}
                            </>
                        ) : (
                            <Text style={styles.sectionTitle}>Results</Text>
                        )
                    ) : (
                        hasHistoryData && <Text style={styles.sectionTitle}>History</Text>
                    )
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#131313',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '800',
        fontSize: 28,
        color: '#FFFFFF',
    },
    tabContainer: {
        height: 40,
        borderRadius: 14,
        backgroundColor: '#212121',
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        height: 36,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonActive: {
        borderWidth: 0.5,
        borderColor: '#0000000A',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    tabButtonText: {
        fontFamily: 'SF Pro',
        fontWeight: '400',
        fontSize: 13,
        color: '#FFFFFF',
    },
    tabButtonTextActive: {
        fontFamily: 'SF Pro',
        fontWeight: '590',
        fontSize: 13,
        color: '#181818',
    },
    content: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontFamily: 'SF Pro',
        fontWeight: '590',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 12,
    },
});
