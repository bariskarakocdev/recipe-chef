import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Fonts
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';

// Constants
import { COLORS } from './src/constants/colors';

// Components
import TabBar from './src/components/TabBar';

// Screens — each screen lives in its own file
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import ProfileScreen from './screens/ProfileScreen';

// ─────────────────────────────────────────────
// App — root component
// Responsible for:
//   1. Loading fonts
//   2. Tracking which tab is active
//   3. Showing the right screen
// ─────────────────────────────────────────────
export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-Bold': Montserrat_700Bold,
  });

  // activeTab — which screen is currently visible
  const [activeTab, setActiveTab] = useState('Home');

  // Show blank screen while fonts are loading
  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, backgroundColor: COLORS.backgroundTop }} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={[COLORS.backgroundTop, COLORS.backgroundBottom]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>

          {activeTab === 'Home'       && <HomeScreen />}
          {activeTab === 'Search'     && <SearchScreen />}
          {activeTab === 'Favourites' && <FavouritesScreen />}
          {activeTab === 'Profile'    && <ProfileScreen />}

          {/* ChatBOT screen — not built yet */}
          {activeTab === 'ChatBOT' && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>ChatBOT — coming soon</Text>
            </View>
          )}

        </SafeAreaView>

        {/* TabBar — always visible, controls activeTab */}
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: COLORS.accent,
  },
});