import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DatePicker } from '../components/DatePicker';
import { Service } from '../components/Service/ServiceSearchListItem';

interface ServiceDetailsProps {
    route: { params: { service: Service } }
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ route }) => {
  const { service } = route.params;

  const [date, setDate] = useState<Date>(new Date());

  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
      <Card title={service.name}>
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
      <Card title="Agendamento">
        <DatePicker
          initialDate={date}
          label="Selecione uma data"
          onSelect={(newDate) => setDate(newDate)}
        />

        <Button onPress={() => console.warn('Not implemented')}>
          Agendar
        </Button>
      </Card>
    </View>
  );
};
