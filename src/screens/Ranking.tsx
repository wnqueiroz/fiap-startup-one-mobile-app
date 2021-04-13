import React, { useCallback, useEffect, useState } from 'react';
import {
  Image, RefreshControl, StyleSheet, Text, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Section } from '../components/Section';
import { useAuth } from '../contexts/auth';
import { useGamification } from '../contexts/gamification';

interface RankingCardProps {
  highlight?: boolean
  userName: string
  currentExperience: number
  currentLevel: number
  positionNumber: number
}

interface RankingCouponProps {
  title: string
  onPress(): void
  enabled?: boolean
}

export const RankingCard: React.FC<RankingCardProps> = ({
  highlight = false,
  userName,
  currentExperience,
  currentLevel,
  positionNumber,
}) => (
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
        >
          {positionNumber}
        </Text>
      </View>
      <View>
        <Text style={[{
          fontSize: 19,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#FF7675',
        }, highlight && { color: '#FFF' }]}
        >{userName}
        </Text>
        <Text style={[{
          fontSize: 16, color: '#808080',
        }, highlight && { color: '#FFF' }]}
        >Nível {currentLevel}
        </Text>
      </View>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[{ fontSize: 16, color: '#808080' }, highlight && { color: '#FFF' }]}>{currentExperience}XP</Text>
    </View>
  </View>
);

export const RankingCoupon: React.FC<RankingCouponProps> = ({ title, onPress, enabled = true }) => (
  <View style={[{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: '#EEEEEE',
  }, !enabled ? {
    opacity: 0.5,
  } : null]}
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
      type={enabled ? 'default' : 'disabled'}
    >
      Resgatar
    </Button>
  </View>
);

export const Ranking: React.FC = () => {
  const {
    fetchUserProgress, userProgress, fetchRanking, ranking,
  } = useGamification();

  const { user } = useAuth();

  async function getScreenData(): Promise<void> {
    setRefreshing(true);
    await Promise.all([
      fetchUserProgress(),
      fetchRanking(),
    ]);
    setRefreshing(false);
  }

  useEffect(() => {
    getScreenData();
  }, []);

  let progressToBar = 0;

  if (userProgress) {
    progressToBar = ((100 * userProgress.progress.currentExperience) / userProgress.progress.experienceToNextLevel) / 100;
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    getScreenData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {userProgress && (
      <>
        <Header>
          <View>
            <Text style={{
              fontSize: 19, fontWeight: 'bold', color: '#FFF', marginBottom: 10,
            }}
            >{user?.name}
            </Text>
            <Text style={{ fontSize: 16, color: '#FFF' }}>
              Nível {userProgress.progress.currentLevel}
            </Text>
          </View>
        </Header>

        <ScrollView
          style={styles.Body}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        >
          <View style={{ paddingTop: 30 + 10 }}>
            <Section title="Seu progresso">
              <View style={{ marginBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text style={{ color: '#808080' }}>
                    {userProgress.progress.currentExperience}XP
                  </Text>
                  <Text style={{ color: '#808080' }}>
                    {userProgress.progress.experienceToNextLevel}XP
                  </Text>
                </View>
                <Progress.Bar
                  progress={progressToBar}
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
                  <Text style={{ fontSize: 19, fontWeight: 'bold', marginRight: 10 }}>
                    {userProgress.credits}
                  </Text>
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
                  enabled={!!userProgress.credits}
                  onPress={() => console.warn('Not implemented')}
                  title="Cupom de R$ 10,00 em qualquer estabelecimento"
                />
                <RankingCoupon
                  enabled={!!userProgress.credits}
                  onPress={() => console.warn('Not implemented')}
                  title="Cupom de R$ 10,00 em qualquer estabelecimento"
                />
                <RankingCoupon
                  enabled={!!userProgress.credits}
                  onPress={() => console.warn('Not implemented')}
                  title="Cupom de R$ 10,00 em qualquer estabelecimento"
                />
                <RankingCoupon
                  enabled={!!userProgress.credits}
                  onPress={() => console.warn('Not implemented')}
                  title="Cupom de R$ 10,00 em qualquer estabelecimento"
                />
              </Card>
            </Section>

            <Section title="Ranking geral">
              {ranking.map((data, index) => (
                <RankingCard
                  highlight={userProgress.id === data.id}
                  userName={data.name}
                  currentExperience={data.progress.currentExperience}
                  currentLevel={data.progress.currentLevel}
                  positionNumber={index + 1}
                  key={data.id}
                />
              ))}
            </Section>
          </View>
        </ScrollView>

      </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
