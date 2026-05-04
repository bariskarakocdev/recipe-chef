import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Heart } from 'lucide-react-native';

import { COLORS } from '../src/constants/colors';

const FAVOURITES = [
  {
    id: '1',
    name: 'Grilled Chicken',
    emoji: '🍗',
    calories: 320,
    protein: 42,
    fat: 14,
    carbs: 0,
  },
  {
    id: '2',
    name: 'Caesar Salad',
    emoji: '🥗',
    calories: 210,
    protein: 8,
    fat: 16,
    carbs: 12,
  },
  {
    id: '3',
    name: 'Avocado Toast',
    emoji: '🥑',
    calories: 290,
    protein: 9,
    fat: 18,
    carbs: 26,
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    emoji: '🫙',
    calories: 150,
    protein: 15,
    fat: 4,
    carbs: 12,
  },
  {
    id: '5',
    name: 'Beef Steak',
    emoji: '🥩',
    calories: 480,
    protein: 52,
    fat: 28,
    carbs: 0,
  },
];

// ─────────────────────────────────────────────
// NutrientBadge — small pill showing one nutrient value
// Props: label ('Protein'), value (42), color (accent)
// ─────────────────────────────────────────────
const NutrientBadge = ({ label, value, color }) => (
  <View style={[styles.badge, { backgroundColor: color + '20' }]}>
    {/* color + '20' adds low opacity — e.g. '#7B57E020' = 12% opacity */}
    <Text style={[styles.badgeValue, { color }]}>{value}g</Text>
    <Text style={[styles.badgeLabel, { color }]}>{label}</Text>
  </View>
);

// ─────────────────────────────────────────────
// FoodCard — one favourited food item
// Props: item (food object), onRemove (function to remove from list)
// ─────────────────────────────────────────────
const FoodCard = ({ item, onRemove }) => (
  <View style={styles.card}>

    {/* Left side — emoji acting as food photo placeholder */}
    <View style={styles.cardImageBox}>
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
    </View>

    {/* Right side — all info */}
    <View style={styles.cardContent}>

      {/* Top row: name + heart button */}
      <View style={styles.cardTopRow}>
        <Text style={styles.cardName}>{item.name}</Text>

        {/* Heart button — pressing removes from favourites */}
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Heart size={20} color="#FF4D4D" fill="#FF4D4D" /* Filled red heart */ />
        </TouchableOpacity>
      </View>

      {/* Calories */}
      <Text style={styles.cardCalories}>{item.calories} kcal</Text>

      {/* Nutrient badges row */}
      <View style={styles.badgesRow}>
        <NutrientBadge label="Protein" value={item.protein} color="#4CAF50" /* green  */ />
        <NutrientBadge label="Fat"     value={item.fat}     color="#FF9800" /* orange */ />
        <NutrientBadge label="Carbs"   value={item.carbs}   color={COLORS.accent} /* purple */ />
      </View>

    </View>
  </View>
);

// ─────────────────────────────────────────────
// EmptyState — shown when there are no favourites left
// ─────────────────────────────────────────────
const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyEmoji}>🤍</Text>
    <Text style={styles.emptyTitle}>No favourites yet</Text>
    <Text style={styles.emptySubtitle}>
      Scan food and save your favourite meals here
    </Text>
  </View>
);

// ─────────────────────────────────────────────
// FavouritesScreen — main component
// ─────────────────────────────────────────────
const FavouritesScreen = () => {
  
  const [items, setItems] = useState(FAVOURITES);

  // removeItem — filters out the item with the given id
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    // .filter() returns a NEW array without the removed item
    // setItems triggers a re-render with the updated list
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >

      {/* Screen title */}
      <Text style={styles.screenTitle}>Favourites</Text>
      <Text style={styles.screenSubtitle}>{items.length} saved meals</Text>

      {/* Show empty state if no items, otherwise show the list */}
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onRemove={removeItem} /* Pass down the remove function */
          />
        ))
      )}

    </ScrollView>
  );
};

// ─────────────────────────────────────────────
// Styles

const styles = StyleSheet.create({

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140, // space for TabBar
  },

  /* ── Header ── */
  screenTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#222',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.textGray,
    marginBottom: 20,
  },

  /* ── Card ── */
  card: {
    flexDirection: 'row',          // image on left, content on right
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImageBox: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardEmoji: {
    fontSize: 36,
  },
  cardContent: {
    flex: 1,                       // takes all remaining space
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  cardCalories: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.textGray,
    marginBottom: 10,
  },

  /* ── Nutrient Badges ── */
  badgesRow: {
    flexDirection: 'row',
    gap: 6,                        // space between badges
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  badgeValue: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  badgeLabel: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },

  /* ── Empty State ── */
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 22,
  },

});

export default FavouritesScreen;