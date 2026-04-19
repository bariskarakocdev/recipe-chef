import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

const GlassCard = ({ height, children, showIcon = false }) => {
  return (
    <View style={[styles.card, { height: height || 200 }]}>
     
      {showIcon && (
        <View style={styles.iconContainer}>
           <ImageIcon color="#444" size={80} strokeWidth={1} />
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 35,
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    opacity: 0.5,
  }
});

export default GlassCard;