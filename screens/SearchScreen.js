import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Search, Mic, RotateCcw } from 'lucide-react-native';

import { COLORS } from '../src/constants/colors';
import CategoryItem from '../src/components/CategoryItem'; 

// last searches shown under the search bar
const recentSearches = [
  { id: '1', label: 'Yemek 2' },
  { id: '2', label: 'Yemek 1' },
];

// category items (same as home screen)
const categories = [
  { id: '1', label: 'Yemek', emoji: '🥦' },
  { id: '2', label: 'Yemek', emoji: '🥩' },
  { id: '3', label: 'Yemek', emoji: '🍕' },
  { id: '4', label: 'Yemek', emoji: '🥤' },
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Search color={COLORS.textGray} size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={COLORS.textGray}
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          autoFocus={true}
        />
        <Mic color={COLORS.textGray} size={20} />
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {categories.map((item) => (
          <CategoryItem key={item.id} label={item.label} emoji={item.emoji} />
        ))}
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSection}>
        <Text style={styles.recentTitle}>Son Aramalar</Text>

        {recentSearches.map((item) => (
          <TouchableOpacity key={item.id} style={styles.recentRow}>
            <RotateCcw color={COLORS.textGray} size={16} style={styles.recentIcon} />
            <Text style={styles.recentText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 140,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10,
  },
  recentSection: {
    marginTop: 25,
  },
  recentTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#222',
    marginBottom: 14,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  recentIcon: {
    marginRight: 10,
  },
  recentText: {
    fontSize: 14,
    color: COLORS.textGray,
    fontFamily: 'Montserrat-Regular',
  },
});

export default SearchScreen;