import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type DropdownItem = {
    label: string;
    value: any;
}

interface DropdownProps {
    label: string
    onSelect?: (value: any) => void
    items: DropdownItem[]
}

export const Dropdown: React.FC<DropdownProps> = ({ label, onSelect, items = [] }) => {
  function handleSelect(value: any) : void {
    console.log({ value });

    if (onSelect) onSelect(value);
  }

  return (
    <View style={styles.DropdownWrapper}>
      <Text style={styles.DropdownLabel}>{label}</Text>

      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <RNPickerSelect
          style={{
            viewContainer: styles.Dropdown,
            chevron: {
              display: 'none',
            },
          }}
          touchableWrapperProps={{
            activeOpacity: 1,
            hitSlop: {
              top: 15,
              bottom: 15,
              left: 120,
              right: 120,
            },
          }}
          placeholder={{
            label: 'Selecione...',
            value: '',
          }}
          onValueChange={handleSelect}
          items={items}
        />
        <Ionicons
          size={20}
          name="ios-time-outline"
          style={{
            marginRight: 20,
            position: 'absolute',
            right: 0,
            color: '#808080',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DropdownWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  Dropdown: {
    borderRadius: 5,
    width: 295,
    maxWidth: 295,
    height: 44,
    fontSize: 16,
    lineHeight: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DropdownLabel: {
    marginBottom: 5,
  },
});
