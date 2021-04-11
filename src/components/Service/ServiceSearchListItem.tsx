import React from 'react';
import {
  StyleProp,
  Text, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { prettyCurrency } from '../../utils';
import { Card } from '../Card';

type ServicePeriod = {
  id: string;
  startTime: string;
  endTime: string;
}

export type Service = {
    id: string
    name: string
    price: number
    companyName: string
    companyAddress: string
    servicePeriods: ServicePeriod[]
}

interface ServiceSearchListItemProps {
    isFirst?: boolean
    data: Service
    onPressListItem: (item: Service)=> void
    cardStyles: StyleProp<ViewStyle>
}

export const ServiceSearchListItem: React.FC<ServiceSearchListItemProps> = ({
  isFirst = false, data, onPressListItem, cardStyles = {},
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => {
      if (onPressListItem) onPressListItem(data);
    }}
    key={data.id}
    style={[isFirst ? { marginTop: 20 } : null]}
  >
    <Card title={data.name} cardStyles={cardStyles}>
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
        >{data.companyName}
        </Text>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#6FCF97',

        }}
        >{prettyCurrency(data.price)}
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
        <Text>{data.companyAddress}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);
