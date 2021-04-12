import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Section } from '../components/Section';

interface RankingCardProps {
  highlight?: boolean
}

interface RankingCouponProps {
  title: string
  onPress(): void
}

export const RankingCard: React.FC<RankingCardProps> = ({ highlight = false }) => (
  <View style={[{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  }, highlight && {
    backgroundColor: '#FF7675',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  }]}
  >
    <View style={{ flexDirection: 'row' }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
      }}
      >
        <Text style={[{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#FF7675',
        }, highlight && { color: '#FFF' }]}
        >1
        </Text>
      </View>
      <View>
        <Text style={[{
          fontSize: 19,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#FF7675',
        }, highlight && { color: '#FFF' }]}
        >William Queiroz
        </Text>
        <Text style={[{ fontSize: 16, color: '#808080' }, highlight && { color: '#FFF' }]}>Nível 1</Text>
      </View>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[{ fontSize: 16, color: '#808080' }, highlight && { color: '#FFF' }]}>128XP</Text>
    </View>
  </View>
);

export const RankingCoupon: React.FC<RankingCouponProps> = ({ title, onPress }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: '#EEEEEE',
  }}
  >
    <Text style={{
      maxWidth: 250,
      flexWrap: 'wrap',
    }}
    >{title}
    </Text>
    <Button
      small
      onPress={onPress}
    >
      Resgatar
    </Button>
  </View>
);

export const Ranking: React.FC = () => (
  <View style={{ flex: 1 }}>

    <Header>
      <View>
        <Text style={{
          fontSize: 19, fontWeight: 'bold', color: '#FFF', marginBottom: 10,
        }}
        >William Queiroz
        </Text>
        <Text style={{ fontSize: 16, color: '#FFF' }}>Nível 1</Text>
      </View>
    </Header>

    <ScrollView
      style={styles.Body}
    >
      <View style={{ paddingTop: 30 + 10 }}>
        <Section title="Seu progresso">
          <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ color: '#808080' }}>0XP</Text>
              <Text style={{ color: '#808080' }}>256XP</Text>
            </View>
            <Progress.Bar
              progress={0.5}
              height={13}
              width={null}
              borderRadius={10}
              unfilledColor="#FFF"
              color="#FF7675"
            />
          </View>
        </Section>
        <Section
          title="Créditos"
          titleRight={(
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            >
              <Text style={{ fontSize: 19, fontWeight: 'bold', marginRight: 10 }}>3</Text>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('../assets/ranking-coin.png')}
              />
            </View>
          )}
        >
          <Card
            cardStyles={{
              paddingBottom: 0,
            }}
            title="Resgates disponíveis"
          >
            <RankingCoupon
              onPress={() => console.warn('Not implemented')}
              title="Cupom de R$ 10,00 em qualquer estabelecimento"
            />
            <RankingCoupon
              onPress={() => console.warn('Not implemented')}
              title="Cupom de R$ 10,00 em qualquer estabelecimento"
            />
            <RankingCoupon
              onPress={() => console.warn('Not implemented')}
              title="Cupom de R$ 10,00 em qualquer estabelecimento"
            />
            <RankingCoupon
              onPress={() => console.warn('Not implemented')}
              title="Cupom de R$ 10,00 em qualquer estabelecimento"
            />
          </Card>
        </Section>

        <Section title="Ranking geral">
          <RankingCard />
          <RankingCard />
          <RankingCard />
          <RankingCard highlight />
          <RankingCard />
          <RankingCard />
          <RankingCard />
          <RankingCard />
          <RankingCard />
          <RankingCard />
        </Section>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
