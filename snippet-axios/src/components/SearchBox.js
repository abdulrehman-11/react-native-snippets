import React from "react";
import SearchBar from "react-native-dynamic-search-bar";

const SearchBox = ({ value, onChangeText, placeholder, onClearPress }) => {
  return (
    <SearchBar
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCorrect={false}
      autoComplete="off"
      onClearPress={onClearPress}
      clearIconImageStyle={{ width: 30, height: 20 }}
      style={{
        borderWidth: 2,
        marginBottom: "2%",
      }}
    />
  );
};

export default SearchBox;
