import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { COLORS } from '../constants/colors';

const CategoryItem = ({ label, emoji }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.circle}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginRight: 15,
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: COLORS.cardBackground, // Glass effect
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 12,
    color: COLORS.textGray,
    fontFamily: 'Montserrat-Regular', 
  },
});

export default CategoryItem;