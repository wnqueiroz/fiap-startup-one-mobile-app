import React, { useEffect } from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SearchBar } from '../components/SearchBar';
import { useAuth } from '../contexts/auth';
import { useStatusBar } from '../contexts/statusBar';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const { setColor } = useStatusBar();

  useEffect(() => {
    setColor('#FF7675');
  }, []);

  return (
    <View>
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

      <SearchBar containerStyle={{
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: 110 - (48 / 2),
      }}
      />
      <View style={styles.Body}>
        <Text style={{ color: '#292929', fontWeight: 'bold', fontSize: 19 }}>
          Sua agenda
        </Text>

        <Image
          style={styles.Image}
          source={require('../assets/empty-calendar.png')}
        />
        <Text style={{
          color: '#808080', fontWeight: 'bold', fontSize: 16, textAlign: 'center',
        }}
        >
          Sem compromissos
        </Text>
        <Text style={{
          color: '#808080',
          fontSize: 12,
          textAlign: 'center',
          flexWrap: 'wrap',
          marginTop: 30,
          paddingHorizontal: 20,
        }}
        >
          Busque por serviços na barra de pesquisa. Seus compromissos marcados aparecerão aqui.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Body: {
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
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
