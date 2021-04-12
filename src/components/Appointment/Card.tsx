import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { prettyDate, prettyTime } from '../../utils';
import { Button } from '../Button';
import { Card } from '../Card';
import { AppointmentCardPlaceholder } from './CardPlaceholder';

interface AppointmentCardProps {
    data: any
    loading: boolean
}

interface IconTextProps {
    text: string
    /**
    * Name of the icon to show
    *
    * See Icon Explorer app
    * {@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}
    */
    iconName: string
}

const IconText: React.FC<IconTextProps> = ({ text, iconName }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons
      size={20}
      name={iconName}
      style={{
        marginRight: 10,
      }}
    />
    <Text style={{ fontSize: 16 }}>{text}</Text>
  </View>
);

const Line: React.FC = ({ children }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  }}
  >{children}
  </View>
);

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ data, loading }) => {
  if (loading) return <AppointmentCardPlaceholder />;

  if (!data || !Object.keys(data).length) return null;

  const { service, servicePeriod, date } = data;

  const formatedDate = prettyDate(date);
  const formatedTime = prettyTime(servicePeriod.startTime, servicePeriod.endTime);

  return (
    <Card title={service.name}>
      <Line>
        <IconText iconName="ios-calendar-outline" text={formatedDate} />
        <IconText iconName="ios-time-outline" text={formatedTime} />
      </Line>
      <Line>
        <Text style={{ fontSize: 16, color: '#FF7675', fontWeight: 'bold' }}>
          {service.companyName}
        </Text>
      </Line>
      <Line>
        <IconText iconName="ios-location-outline" text={service.companyAddress} />
      </Line>

      <Button
        type="outline"
        onPress={() => console.warn('Not Implemented')}
      >
        Desmarcar
      </Button>
    </Card>
  );
};
