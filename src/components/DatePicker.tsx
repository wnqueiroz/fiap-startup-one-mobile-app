import React, { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DatePickerProps {
    label: string
    onSelect?: (date: Date) => void
    initialDate?: Date
}

export const DatePicker: React.FC<DatePickerProps> = ({ onSelect, label, initialDate = new Date() }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(initialDate);

  const showDatePicker = (): void => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (): void => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date): void => {
    if (onSelect) onSelect(selectedDate);

    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.DatePickerContainer}>
      <Text style={styles.DatePickerLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={showDatePicker}
        style={styles.DatePicker}
      >
        <Text>{new Intl.DateTimeFormat('pt-BR')
          .format(date)
          .replace(/\//g, ' / ')}
        </Text>
        <Ionicons
          size={20}
          name="ios-calendar-sharp"
          style={{
            marginRight: 20,
            position: 'absolute',
            right: 0,
            color: '#808080',

          }}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        locale="pt_BR"
        minimumDate={date}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Selecionar"
        cancelTextIOS="Cancelar"
        headerTextIOS="Selecione uma data"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  DatePickerContainer: {
    alignSelf: 'center',
  },
  DatePicker: {
    borderRadius: 5,
    width: 295,
    maxWidth: 295,
    height: 44,
    fontSize: 16,
    lineHeight: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    marginBottom: 20,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DatePickerLabel: {
    marginBottom: 5,
  },
});
