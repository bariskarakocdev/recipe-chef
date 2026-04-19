import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Heart, User, Stars } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

const TabItem = ({ Icon, label, isActive }) => (
  <TouchableOpacity style={styles.tabItem}>
    <Icon color={isActive ? COLORS.accent : COLORS.textGray} size={24} />
    <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>{label}</Text>
  </TouchableOpacity>
);

const TabBar = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TabItem Icon={Home} label="Home" isActive={true} />
        <TabItem Icon={Search} label="Search" />
        
        {/* Central Button */}
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity style={styles.centerButton}>
            <Stars color="white" size={28} fill="white" />
          </TouchableOpacity>
          <Text style={styles.centerLabel}>ChatBOT</Text>
        </View>

        <TabItem Icon={Heart} label="Favourites" />
        <TabItem Icon={User} label="Profile" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textGray,
    marginTop: 4,
    fontFamily: 'Montserrat-Regular', 
  },
  activeLabel: {
    color: COLORS.accent,
    fontFamily: 'Montserrat-SemiBold', 
  },
  centerLabel: {
    fontSize: 10,
    color: '#333',
    marginTop: 4,
    fontFamily: 'Montserrat-Bold', 
  }
});

export default TabBar;