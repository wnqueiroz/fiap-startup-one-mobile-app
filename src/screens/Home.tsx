import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { AppointmentCard } from '../components/Appointment/Card';
import { AppointmentList } from '../components/Appointment/List';
import { SearchBar } from '../components/SearchBar';
import { Section } from '../components/Section';
import { ServiceSearchList } from '../components/Service/ServiceSearchList';
import { Service } from '../components/Service/ServiceSearchListItem';
import { SCREENS } from '../contants';
import { useAppointments } from '../contexts/appointments';
import { useAuth } from '../contexts/auth';
import { useStatusBar } from '../contexts/statusBar';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { setColor } = useStatusBar();
  const navigation = useNavigation();

  const {
    appointments,
    nextAppointment,
    searchServicesResults,
    fetchAll,
    searchServices,
    clearSearchServices,
  } = useAppointments();

  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState('');
  const [showSearchListResults, setShowSearchListResults] = useState(false);

  async function handleSearch(): Promise<void> {
    await searchServices(searchTerms);

    setShowSearchListResults(true);
  }

  function handleServiceDetails(service: Service): void {
    navigation.navigate(SCREENS.SERVICE_DETAILS, {
      service,
    });
  }

  async function getScreenData(): Promise<void> {
    await fetchAll();

    setLoading(false);
  }

  function clearSearchResults() : void {
    setShowSearchListResults(false);
    clearSearchServices();
    setSearchTerms('');
  }

  useEffect(() => {
    setColor('#FF7675');

    getScreenData();
  }, []);

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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => logout()}
          >
            <Ionicons
              size={25}
              name="ios-log-out-outline"
              color="#fff"
            />
          </TouchableOpacity>
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
          zIndex: 1,
        }}
      />

      {showSearchListResults
        ? (
          <View style={{ paddingTop: 30, flex: 1 }}>
            <ServiceSearchList
              onPressListItem={handleServiceDetails}
              data={searchServicesResults}
            />
          </View>
        ) : (
          <ScrollView
            style={styles.Body}
          >
            <View style={{ paddingTop: 30 + 10 }}>
              {nextAppointment && (
              <Section title="Seu próximo compromisso">
                <AppointmentCard
                  data={nextAppointment}
                  loading={loading}
                />
              </Section>
              )}
              <AppointmentList
                data={appointments}
                loading={loading}
              />
            </View>
          </ScrollView>
        )}
    </View>
  );
};

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
  },
});
