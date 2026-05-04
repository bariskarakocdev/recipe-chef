import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// Components used on the Home screen
import SearchBar from '../src/components/SearchBar';
import CategoryItem from '../src/components/CategoryItem';
import GlassCard from '../src/components/GlassCard';

const HomeScreen = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.scrollContent}
  >

    {/* Search Bar */}
    <SearchBar />

    {/* Categories Row */}
    <View style={styles.categoriesContainer}>
      <CategoryItem label="Food" emoji="🥦" />
      <CategoryItem label="Food" emoji="🥩" />
      <CategoryItem label="Food" emoji="🍕" />
      <CategoryItem label="Food" emoji="🥤" />
    </View>

    {/* Cards */}
    <GlassCard height={220} showIcon={true} />
    <GlassCard height={350} showIcon={false} />

  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 140, // space for TabBar
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10,
  },
});

export default HomeScreen;