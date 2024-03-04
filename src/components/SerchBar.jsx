import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SearchBar = ({handleSearchProducts}) => {
  const [searchText, setSearchText] = useState('');
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleSearch = () => {
      if(searchText.length === 0) return;
      handleSearchProducts({inputText: searchText.trim()});
      setSearchText("");
      return;
  };

  return (
      <View style={{backgroundColor: "white", padding: 10}}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#a1a1aa"
        />
      </View>
  );
};

const styles = StyleSheet.create({
searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    color: "gray"
  }
});

export default SearchBar;