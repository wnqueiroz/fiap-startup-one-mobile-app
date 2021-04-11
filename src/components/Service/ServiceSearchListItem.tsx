import React from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Card } from '../Card';

export type Service = {
    id: string
    name: string
}

interface ServiceSearchListItemProps {
    isFirst?: boolean
    data: Service
    onPressListItem: (item: Service)=> void
}

export const ServiceSearchListItem: React.FC<ServiceSearchListItemProps> = ({
  isFirst = false, data, onPressListItem,
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => {
      if (onPressListItem) onPressListItem(data);
    }}
    key={data.id}
    style={[isFirst ? { marginTop: 20 } : null]}
  >
    <Card title={data.name}>
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
    </Card>
  </TouchableOpacity>
);
