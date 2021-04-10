import React, { useState } from 'react';
import {
  View, TextInput as BaseTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  onBlur?: (value: string) => void;
  onClear?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onBlur,
  containerStyle,
  onClear,
}) => {
  const [value, setValue] = useState('');
  const [isBlured, setIsBlured] = useState(true);

  const [focused, setIsFocused] = useState(false);

  function clearSearch(): void {
    setIsBlured(false);
    setValue('');
    if (onClear) onClear();
  }

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
        autoCapitalize="none"
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

          setIsBlured(true);
        }}
        placeholder="Encontre serviços aqui..."
        returnKeyType="search"
      />
      {(isBlured && value.length) ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={clearSearch}
          style={styles.TrashIcon}
        >
          <Ionicons
            size={20}
            name="ios-trash-sharp"
            color={value ? '#FF7675' : '#808080'}
          />
        </TouchableOpacity>

      ) : null}
    </View>
  );
};

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
    left: 30,
  },
  TrashIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 30,
  },
});
