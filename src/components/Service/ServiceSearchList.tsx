import React from 'react';
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Service, ServiceSearchListItem } from './ServiceSearchListItem';

interface ServiceSearchListProps {
  data?: any[],
  onPressListItem: (item: Service)=> void
}

export const ServiceSearchList: React.FC<ServiceSearchListProps> = ({
  data = [],
  onPressListItem,
}) => (
  <View style={{ flex: 1 }}>
    <View style={{
      height: 58,
      backgroundColor: '#fff',
      flexDirection: 'row',
      marginTop: 20,
    }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          alignSelf: 'center',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#FF7675',
        }}
        >Serviços ({data.length})
        </Text>
        <View style={{
          borderWidth: 1,
          borderColor: '#FF7675',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        />
      </View>
      <View style={{ flex: 1 }} />
    </View>

    {data.length ? (
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={data}
        renderItem={({ item: service, index }) => (
          <ServiceSearchListItem
            cardStyles={{ marginHorizontal: 10 }}
            onPressListItem={onPressListItem}
            data={service}
            isFirst={index === 0}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Image
          style={{ height: 250, width: 250 }}
          source={require('../../assets/not-found.png')}
        />

        <Text style={{ color: '#808080', fontSize: 16, fontWeight: 'bold' }}>
          Ops! Nenhum resultado encontrado
        </Text>

        <Text style={{ color: '#808080', fontSize: 12, marginTop: 10 }}>
          Por favor, tente outra busca
        </Text>

      </View>
    )}

  </View>
);
