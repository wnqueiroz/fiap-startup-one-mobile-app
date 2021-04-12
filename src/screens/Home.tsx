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
import { useAuth } from '../contexts/auth';
import { useStatusBar } from '../contexts/statusBar';
import * as appointments from '../services/appointments';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { setColor } = useStatusBar();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState('');
  const [appointmentList, setAppointmentList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchListResults, setShowSearchListResults] = useState(false);
  const [nextAppointment, setNextAppointment] = useState(null);

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

    setAppointmentList(response);
  }

  async function fetchNextAppointment(): Promise<void> {
    const response = await appointments.getNextAppointment();

    setNextAppointment(response);
  }

  async function getScreenData(): Promise<void> {
    await Promise.all([
      fetchAllAppointments(),
      fetchNextAppointment(),
    ]);

    setLoading(false);
  }

  function clearSearchResults() : void {
    setShowSearchListResults(false);
    setSearchResults([]);
    setSearchTerms('');
  }

  useEffect(() => {
    setColor('#FF7675');

    getScreenData();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearSearchResults();
      getScreenData();
    });
    return unsubscribe;
  }, [navigation]);

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
              data={searchResults}
            />
          </View>
        ) : (
          <ScrollView
            style={styles.Body}
          >
            <View style={{ paddingTop: 30 + 10 }}>
              <Section title="Seu próximo compromisso">
                <AppointmentCard
                  data={nextAppointment}
                  loading={loading}
                />
              </Section>
              <AppointmentList
                data={appointmentList}
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
