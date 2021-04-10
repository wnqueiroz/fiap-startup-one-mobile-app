import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type Service = {
    id: string
    name: string
}

interface ServiceSearchListItemProps {
    isFirst: boolean
    data: Service
    onPressListItem: (item: Service)=> void
}

export const ServiceSearchListItem: React.FC<ServiceSearchListItemProps> = ({
  isFirst, data, onPressListItem,
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => {
      if (onPressListItem) onPressListItem(data);
    }}
    key={data.id}
    style={[styles.Container, isFirst ? { marginTop: 20 } : null]}
  >
    <View style={styles.TabBarContainer}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      >{data.name}
      </Text>
      <View style={styles.TabBarBottomLine} />
    </View>

    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
    }}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF7675',
      }}
      >TODO
      </Text>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6FCF97',

      }}
      >R$ TODO
      </Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons
        size={20}
        name="ios-location-outline"
        style={{
          marginRight: 10,
        }}
      />
      <Text>Av. das Nações Unidas, 22540 - Jurubatuba</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexGrow: 1,
  },
  TabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
  },
  TabBarBottomLine: {
    borderWidth: 0.5,
    borderColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
