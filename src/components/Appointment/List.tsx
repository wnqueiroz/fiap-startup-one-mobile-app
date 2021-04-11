import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

import { Section } from '../Section';
import { AppointmentCardPlaceholder } from './CardPlaceholder';

interface AppointmentListProps {
    data?: any[],
    loading?: boolean
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ data = [], loading = false }) => (loading ? (
  <>
    <AppointmentCardPlaceholder />
    <AppointmentCardPlaceholder />
    <AppointmentCardPlaceholder />
  </>
) : (
  <>
    <Section title="Sua agenda">
      {!data.length ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.Image}
            source={require('../../assets/empty-calendar.png')}
          />
          <Text style={{ color: '#808080', fontSize: 16, fontWeight: 'bold' }}>
            Sem compromissos
          </Text>

          <Text style={{
            color: '#808080', fontSize: 12, marginTop: 10, textAlign: 'center',
          }}
          >
            Busque por serviços na barra de pesquisa. Seus compromissos marcados aparecerão aqui.
          </Text>
        </View>
      ) : null}
    </Section>
  </>
));

const styles = StyleSheet.create({
  Image: {
    width: 250,
    height: 250,
  },
});
