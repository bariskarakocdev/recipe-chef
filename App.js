import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Fonts - importing Montserrat family
import { 
  useFonts, 
  Montserrat_400Regular, 
  Montserrat_600SemiBold, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';

// Constants
import { COLORS } from './src/constants/colors';

// Components
import SearchBar from './src/components/SearchBar';
import CategoryItem from './src/components/CategoryItem';
import GlassCard from './src/components/GlassCard';
import TabBar from './src/components/TabBar';

export default function App() {
  // Load fonts and handle potential errors
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-Bold': Montserrat_700Bold,
  });

  // If fonts are still loading and there is no error, show a fallback background
  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, backgroundColor: COLORS.backgroundTop }} />;
  }

  return (
    <View style={styles.container}>
      {/* Dark icons for the status bar (time, battery) */}
      <StatusBar barStyle="dark-content" />
      
      {/* Main Background Gradient */}
      <LinearGradient 
        colors={[COLORS.backgroundTop, COLORS.backgroundBottom]} 
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Scrollable area for the main content */}
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
          >
            {/* Search Bar Component */}
            <SearchBar />

            {/* Categories Horizontal Row */}
            <View style={styles.categoriesContainer}>
              <CategoryItem label="Food" emoji="🥦" />
              <CategoryItem label="Food" emoji="🥩" />
              <CategoryItem label="Food" emoji="🍕" />
              <CategoryItem label="Food" emoji="🥤" />
            </View>

            {/* Main Content: Glassmorphism Cards */}
            {/* Top Card - with icon */}
            <GlassCard height={220} showIcon={true} />
            
            {/* Bottom Card - empty/no icon */}
            <GlassCard height={350} showIcon={false} />

          </ScrollView>
        </SafeAreaView>

        {/* Floating Bottom Navigation Bar */}
        <TabBar />
        
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    // paddingBottom is crucial so the content isn't hidden by the TabBar
    paddingBottom: 140, 
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10,
  },
});