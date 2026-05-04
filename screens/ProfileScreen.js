import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Target,
  Clock,
  Bell,
  Globe,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../src/constants/colors';

const USER = {
  name: 'Alex Xela',
  email: 'alex@example.com',
  stats: {
    scanned: 142,    // total foods scanned
    calories: 1850,  // average daily calories
    days: 38,        // days using the app
  },
};

// ─────────────────────────────────────────────
// getAvatarColors — generates a gradient based on the user's name
// Each letter has a char code, we use it to pick colors
// Same name always gives same colors
// ─────────────────────────────────────────────
const getAvatarColors = (name) => {
  // take first two letters of the name to generate two colors
  const a = name.charCodeAt(0) * 10;
  const b = name.charCodeAt(1) * 10;

  // build two hsl colors — hue changes based on the letter codes
  const color1 = `hsl(${a % 360}, 70%, 55%)`;
  const color2 = `hsl(${(a + b) % 360}, 70%, 40%)`;

  return [color1, color2];
};

// ─────────────────────────────────────────────
// getInitials — returns "AJ" from "Alex Johnson"
// ─────────────────────────────────────────────
const getInitials = (name) => {
  return name
    .split(' ')              // ['Alex', 'Johnson']
    .map((word) => word[0])  // ['A', 'J']
    .join('');               // 'AJ'
};

// ─────────────────────────────────────────────
// StatCard — one stat block (number + label)
// ─────────────────────────────────────────────
const StatCard = ({ value, label }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─────────────────────────────────────────────
// MenuItem — one row in the menu list
// ─────────────────────────────────────────────
const MenuItem = ({ Icon, label, onPress, isLogout }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
  >
    {/* Left icon — red if logout, accent purple otherwise */}
    <View style={[styles.menuIcon, isLogout && styles.menuIconLogout]}>
      <Icon
        size={18}
        color={isLogout ? '#FF4D4D' : COLORS.accent}
      />
    </View>

    {/* Label text */}
    <Text style={[styles.menuLabel, isLogout && styles.menuLabelLogout]}>
      {label}
    </Text>

    {/* Arrow on the right */}
    <ChevronRight size={18} color={COLORS.textGray} />
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// ProfileScreen — main component
// ─────────────────────────────────────────────
const ProfileScreen = () => {
  const initials = getInitials(USER.name);
  const avatarColors = getAvatarColors(USER.name);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >

      {/* ── Avatar + Name + Email ── */}
      <View style={styles.header}>

        {/* Avatar circle with gradient generated from name */}
        <LinearGradient
          colors={avatarColors}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.initials}>{initials}</Text>
        </LinearGradient>

        <Text style={styles.name}>{USER.name}</Text>
        <Text style={styles.email}>{USER.email}</Text>

      </View>

      {/* ── Stats Row ── */}
      <View style={styles.statsRow}>
        <StatCard value={USER.stats.scanned} label="Scanned" />

        {/* Vertical divider between cards */}
        <View style={styles.statDivider} />

        <StatCard value={USER.stats.calories} label="Avg kcal" />

        <View style={styles.statDivider} />

        <StatCard value={USER.stats.days} label="Days" />
      </View>

      {/* ── Menu ── */}
      <View style={styles.menuCard}>

        <MenuItem Icon={Target}  label="My Goals" />
        <MenuItem Icon={Clock}   label="History" />
        <MenuItem Icon={Bell}    label="Notifications" />
        <MenuItem Icon={Globe}   label="Language" />

        {/* Divider before logout */}
        <View style={styles.menuDivider} />

        <MenuItem Icon={LogOut} label="Log Out" isLogout={true} />

      </View>

    </ScrollView>
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const styles = StyleSheet.create({

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140, // space for TabBar
  },

  /* ── Header ── */
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    // soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  initials: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#222',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.textGray,
  },

  /* ── Stats ── */
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 25,
    paddingVertical: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: COLORS.textGray,
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  /* ── Menu ── */
  menuCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',      // icon — label — arrow in a row
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(123, 87, 224, 0.1)', // light purple bg
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuIconLogout: {
    backgroundColor: 'rgba(255, 77, 77, 0.1)', // light red bg for logout
  },
  menuLabel: {
    flex: 1,                   // takes all space, pushes arrow to the right
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: '#222',
  },
  menuLabelLogout: {
    color: '#FF4D4D',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginVertical: 4,
  },

});

export default ProfileScreen;