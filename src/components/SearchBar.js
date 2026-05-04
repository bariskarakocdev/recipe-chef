import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Search, Mic } from 'lucide-react-native'; // Icons
import { COLORS } from '../constants/colors';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Search color={COLORS.textGray} size={20} style={styles.searchIcon} />
      <TextInput 
        placeholder="Search" 
        placeholderTextColor={COLORS.textGray}
        style={styles.input}
      />
      <Mic color={COLORS.textGray} size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Elements in row
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 25, // Rounded corners
    paddingHorizontal: 15,
    height: 50,
    marginTop: 20,
    // (Shadows)
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
});

export default SearchBar;