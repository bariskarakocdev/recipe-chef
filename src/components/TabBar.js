import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Heart, User, Stars } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

// ─────────────────────────────────────────────
// TabItem — a single tab button
// Props:
//   Icon      — the icon component to render
//   label     — text shown below the icon
//   isActive  — true if this tab is currently selected
//   onPress   — function called when the user taps this tab
// ─────────────────────────────────────────────
const TabItem = ({ Icon, label, isActive, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    <Icon
      color={isActive ? COLORS.accent : COLORS.textGray}
      size={24}
    />
    <Text style={[
      styles.tabLabel,
      isActive && styles.activeLabel
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// TabBar — bottom navigation bar
// Props:
//   activeTab   — string like 'Home' or 'Search'
//   onTabPress  — function that receives the tab name and switches the screen
// ─────────────────────────────────────────────
const TabBar = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        {/* Home tab */}
        <TabItem
          Icon={Home}
          label="Home"
          isActive={activeTab === 'Home'}
          onPress={() => onTabPress('Home')}
        />

        {/* Search tab */}
        <TabItem
          Icon={Search}
          label="Search"
          isActive={activeTab === 'Search'}
          onPress={() => onTabPress('Search')}
        />

        {/* Central ChatBOT button */}
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity
            style={[
              styles.centerButton,
              activeTab === 'ChatBOT' && styles.centerButtonActive
            ]}
            onPress={() => onTabPress('ChatBOT')}
          >
            <Stars color="white" size={28} fill="white" />
          </TouchableOpacity>
          <Text style={styles.centerLabel}>ChatBOT</Text>
        </View>

        {/* Favourites tab */}
        <TabItem
          Icon={Heart}
          label="Favourites"
          isActive={activeTab === 'Favourites'}
          onPress={() => onTabPress('Favourites')}
        />

        {/* Profile tab */}
        <TabItem
          Icon={User}
          label="Profile"
          isActive={activeTab === 'Profile'}
          onPress={() => onTabPress('Profile')}
        />

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
  centerButtonWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  centerButtonActive: {
    backgroundColor: '#5a3db8',
  },
  centerLabel: {
    fontSize: 10,
    color: '#333',
    marginTop: 4,
    fontFamily: 'Montserrat-Bold',
  },
});

export default TabBar;