import React, { useState } from 'react';
import {
  View, TextInput as BaseTextInput, StyleSheet, StyleProp, ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
  },
  SearchBar: {
    backgroundColor: '#fff',
    height: 48,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingLeft: 50,
    marginHorizontal: 10,
  },
  SearchBarFocused: {
    borderWidth: 1,
    borderColor: '#FF7675',
  },
  SearchIcon: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 30,
  },
});

interface SearchBarProps {
  onBlur?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onBlur, containerStyle }) => {
  const [value, setValue] = useState('');

  const [focused, setIsFocused] = useState(false);

  return (
    <View
      style={[styles.Container, containerStyle]}
    >
      <Ionicons
        size={20}
        style={styles.SearchIcon}
        name="ios-search-outline"
        color={focused ? '#FF7675' : '#808080'}
      />
      <BaseTextInput
        autoCompleteType="off"
        autoCorrect={false}
        style={[
          styles.SearchBar,
          focused ? styles.SearchBarFocused : null,
        ]}
        value={value}
        onChangeText={(newValue) => setValue(newValue)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur(value);
        }}
        placeholder="Encontre serviços aqui..."
      />
    </View>
  );
};
