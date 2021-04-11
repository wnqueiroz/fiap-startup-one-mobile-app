import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import {
  Fade, Placeholder, PlaceholderLine,
} from 'rn-placeholder';

import { SearchBar } from '../components/SearchBar';
import { ServiceSearchList } from '../components/Service/ServiceSearchList';
import { Service } from '../components/Service/ServiceSearchListItem';
import { SCREENS } from '../contants';
import { useAuth } from '../contexts/auth';
import { useStatusBar } from '../contexts/statusBar';
import * as appointments from '../services/appointments';

interface HomeProps {
  route: { params: { refresh: boolean } }
}
export const Home: React.FC<HomeProps> = ({ route }) => {
  const { refresh } = route.params;

  const { user } = useAuth();
  const { setColor } = useStatusBar();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState('');
  const [appointmentList, setAppointmentList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchListResults, setShowSearchListResults] = useState(false);

  async function handleSearch(): Promise<void> {
    if (searchTerms.length) {
      const response = await appointments.getServicesByName(searchTerms);

      setSearchResults(response);
      setShowSearchListResults(true);
    }
  }

  function handleServiceDetails(service: Service): void {
    navigation.navigate(SCREENS.SERVICE_DETAILS, {
      service,
    });
  }

  async function fetchAllAppointments(): Promise<void> {
    const response = await appointments.getAll();

    setLoading(false);

    setAppointmentList(response);
  }

  function clearSearchResults() : void {
    setShowSearchListResults(false);
    setSearchResults([]);
    setSearchTerms('');
  }

  useEffect(() => {
    setColor('#FF7675');
    fetchAllAppointments();
  }, []);

  React.useEffect(() => {
    if (refresh) {
      clearSearchResults();
      fetchAllAppointments();
    }
  }, [refresh]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Header}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Text style={{ fontSize: 16, color: '#fff' }}>Olá {user?.name}!</Text>
          <Ionicons
            size={25}
            name="ios-notifications-outline"
            color="#fff"
          />
        </View>
      </View>

      <SearchBar
        value={searchTerms}
        onBlur={handleSearch}
        onChange={(newSearchTerms) => {
          setSearchTerms(newSearchTerms);
        }}
        onClear={clearSearchResults}
        containerStyle={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginTop: 110 - (48 / 2),
        }}
      />

      <View style={styles.Body}>
        {showSearchListResults
          ? (
            <ServiceSearchList
              onPressListItem={handleServiceDetails}
              data={searchResults}
            />
          ) : (
            <AppointmentList
              data={appointmentList}
              loading={loading}
            />
          )}
      </View>
    </View>
  );
};

interface AppointmentListProps {
  data?: any[],
  loading?: boolean
}

const AppointmentList: React.FC<AppointmentListProps> = ({ data = [], loading = false }) => (loading ? (
  <Placeholder
    Animation={Fade}
  >
    <PlaceholderLine style={{ marginBottom: 20 }} />
    <PlaceholderLine width={80} />
    <PlaceholderLine />
    <PlaceholderLine width={30} />
    <PlaceholderLine width={80} height={48} style={{ alignSelf: 'center' }} />
  </Placeholder>
) : (
  <>
    <Text style={{ color: '#292929', fontWeight: 'bold', fontSize: 19 }}>
      Sua agenda
    </Text>

    {!data.length ? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.Image}
          source={require('../assets/empty-calendar.png')}
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

  </>
));

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  Header: {
    backgroundColor: '#FF7675',
    height: 110,
    paddingHorizontal: 40,
    justifyContent: 'center',
    marginBottom: 30 + (48 / 2),
  },
  Image: {
    width: 250,
    height: 250,
  },
});
