import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DatePicker } from '../components/DatePicker';
import { Dropdown, DropdownItem } from '../components/Dropdown';
import { Service } from '../components/Service/ServiceSearchListItem';
import { SCREENS } from '../contants';
import { useAppointments } from '../contexts/appointments';
import { prettyCurrency, prettyTime } from '../utils';

interface ServiceDetailsProps {
    route: { params: { service: Service } }
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  route,
}) => {
  const { service } = route.params;

  const [date, setDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState(null);
  const [enableButton, setEnableButton] = useState(false);

  const navigation = useNavigation();
  const { clearSearchServices, createAppointment } = useAppointments();

  function getDropdownItems(): DropdownItem[] {
    const data = service.servicePeriods.map(({
      id,
      startTime, endTime,
    }) => ({
      label: prettyTime(startTime, endTime),
      value: id,
    }));

    return data;
  }

  async function handleAppointment(): Promise<void> {
    await createAppointment({
      idService: service.id,
      idServicePeriod: `${period}`,
      date: new Date(date).toISOString().split('T')[0],
    });

    clearSearchServices();

    navigation.navigate(SCREENS.HOME, {
      refresh: true,
    });
  }

  useEffect(() => {
    if (!date || !period || period === '') {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  }, [date, period]);

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
          >{service.companyName}
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#6FCF97',

          }}
          >{prettyCurrency(service.price)}
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
          <Text>{service.companyAddress}</Text>
        </View>
      </Card>

      <Card title="Agendamento">
        <DatePicker
          initialDate={date}
          label="Selecione uma data"
          onSelect={(newDate) => setDate(newDate)}
        />
        <Dropdown
          label="Selecione um horário"
          items={getDropdownItems()}
          onSelect={(newPeriod) => setPeriod(newPeriod)}
        />
        <Button
          onPress={handleAppointment}
          type={enableButton ? 'default' : 'disabled'}
          customButtonStyle={{ marginTop: 10 }}
        >
          Agendar
        </Button>
      </Card>
    </View>
  );
};
