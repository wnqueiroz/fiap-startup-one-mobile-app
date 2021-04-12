import React from 'react';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { APPOINTMENT_STATUS } from '../../contants';
import { useModal } from '../../contexts/modal';
import * as appointments from '../../services/appointments';
import { prettyDate, prettyTime } from '../../utils';
import { Button } from '../Button';
import { Card } from '../Card';
import { AppointmentCardPlaceholder } from './CardPlaceholder';

interface AppointmentCardProps {
    data: any
    loading: boolean
}
interface CancelAppointmentModalContentProps {
    onConfirm(): void
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

const CancelAppointmentModalContent: React.FC<CancelAppointmentModalContentProps> = ({
  onConfirm,
}) => {
  const { closeModal } = useModal();

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Text
        style={{
          fontSize: 19,
          fontWeight: 'bold',
          marginBottom: 30,
        }}
      >Deseja realmente cancelar?
      </Text>
      <Image
        style={{ width: 190, height: 190, marginBottom: 30 }}
        source={require('../../assets/cancel-appointment-art.png')}
      />
      <Text
        style={{
          fontSize: 16,
          marginBottom: 30,
          textAlign: 'center',
        }}
      >Ao cancelar, você deixa de ganhar experiência por não realizar seu compromisso
      </Text>
      <Button
        onPress={onConfirm}
        customButtonStyle={{ marginBottom: 20 }}
        type="outline"
      >Sim, quero cancelar
      </Button>
      <Button
        onPress={closeModal}
        customButtonStyle={{ marginBottom: 40 }}
      >Voltar
      </Button>
    </View>
  );
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ data, loading }) => {
  if (loading) return <AppointmentCardPlaceholder />;

  if (!data || !Object.keys(data).length) return null;

  const { service, servicePeriod, date } = data;

  const formatedDate = prettyDate(date);
  const formatedTime = prettyTime(servicePeriod.startTime, servicePeriod.endTime);

  const { openModal, closeModal, setModalContent } = useModal();

  const isCancelled = APPOINTMENT_STATUS.CANCEL_CUSTOMER === data.idAppointmentStatus;

  async function handleCancelAppointment(): Promise<void> {
    await appointments.cancel(data.id);

    closeModal();
  }

  function openCancelAppointmentModal(): void {
    setModalContent(
      <CancelAppointmentModalContent
        onConfirm={handleCancelAppointment}
      />,
    );
    openModal();
  }

  return (
    <TouchableOpacity
      style={{
        opacity: isCancelled ? 0.5 : 1,
      }}
      disabled={isCancelled}
      onPress={() => console.warn('Not implemented')}
    >
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
          type={isCancelled ? 'disabled' : 'outline'}
          onPress={openCancelAppointmentModal}
        >
          Desmarcar
        </Button>
      </Card>
    </TouchableOpacity>
  );
};
