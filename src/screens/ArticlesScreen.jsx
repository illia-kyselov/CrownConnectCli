import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ArticlesScreen() {
    const articles = useSelector(state => state.articles);
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ArticleDetail', { article: item })}>
            <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <LinearGradient
                    colors={[
                        'rgba(0,0,0,0.2)',
                        'rgba(0,0,0,0.2)',
                        'rgba(0,0,0,0.2)',
                    ]}
                    style={styles.cardImageOverlay}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                        {item.title}
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={1} ellipsizeMode="tail">
                        {item.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Crown articles" />
            <View style={styles.content}>
                <FlatList
                    data={articles}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingBottom: 88,
    },
    content: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 12,
    },
    listContent: {
        paddingBottom: 22,
    },
    card: {
        height: 177,
        borderRadius: 18,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    cardImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardImageOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    textContainer: {
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    cardTitle: {
        fontFamily: 'SF Pro Text',
        fontWeight: '500',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    cardDescription: {
        fontFamily: 'SF Pro Text',
        fontWeight: '400',
        fontSize: 12,
        color: '#FFFFFF',
    },
});
