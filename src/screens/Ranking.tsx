import React, { useCallback, useEffect, useState } from 'react';
import {
  Image, RefreshControl, StyleProp, StyleSheet, Text, View, ViewStyle,
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
  description: string
  onPress?(): void
  enabled?: boolean
  credits: number
  customStyles?: StyleProp<ViewStyle>
  rescued?: boolean
  couponCode?: string
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

export const RankingCoupon: React.FC<RankingCouponProps> = ({
  title,
  description,
  onPress,
  enabled = true,
  credits,
  customStyles = {},
  rescued = false,
  couponCode = null,
}) => (
  <View style={[{
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: '#EEEEEE',
  },
  customStyles,
  !enabled ? {
    opacity: 0.5,
  } : null]}
  >
    <View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>{title}</Text>
      <Text>{description}</Text>
    </View>

    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    }}
    >{!rescued ? (
      <Button
        small
        onPress={() => {
          if (onPress) onPress();
        }}
        type={enabled ? 'default' : 'disabled'}
        customButtonStyle={{
          alignSelf: 'flex-start',
        }}
      >
        Resgatar
      </Button>
    )
      : (
        <View style={{
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderStyle: 'dashed',
          borderColor: '#FF7675',
          borderWidth: 1,
        }}
        >
          <Text style={{
            fontWeight: 'bold',
          }}
          >código: {couponCode}
          </Text>
        </View>
      )}

      <CoinCredits credits={credits} opacity={!rescued} />
    </View>
  </View>
);

interface CoinCredits {
  credits: number | string
  opacity?: boolean
}

const CoinCredits: React.FC<CoinCredits> = ({ credits, opacity = false }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: !opacity ? 0.5 : 1,
  }}
  >
    <Text style={{ fontSize: 19, fontWeight: 'bold', marginRight: 10 }}>
      {credits}
    </Text>
    <Image
      style={{
        width: 20,
        height: 20,
      }}
      source={require('../assets/ranking-coin.png')}
    />
  </View>
);

export const Ranking: React.FC = () => {
  const {
    ranking,
    availableCoupons,
    userProgress,
    fetchUserProgress,
    fetchRanking,
    fetchAvailableCoupons,
    rescueCoupon,
    rescuedCoupons,
    fetchRescuedCoupons,
  } = useGamification();

  const { user } = useAuth();

  async function handleWithCouponRescue(idCounpon: string): Promise<void> {
    await rescueCoupon(idCounpon);
    getScreenData();
  }

  async function getScreenData(): Promise<void> {
    await Promise.all([
      fetchUserProgress(),
      fetchRanking(),
      fetchAvailableCoupons(),
      fetchRescuedCoupons(),
    ]);
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
    async function handleRefresh(): Promise<void> {
      setRefreshing(true);
      await getScreenData();
      setRefreshing(false);
    }
    handleRefresh();
  }, []);

  const rescuedCouponsIds = rescuedCoupons.map(({ id }) => id);
  const availableCouponsIds = availableCoupons.map(({ id }) => id);

  const userHasRedeemedAllCoupons = availableCouponsIds.length === rescuedCouponsIds.length;

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
              {availableCoupons.length && !userHasRedeemedAllCoupons ? (
                <Card
                  cardStyles={{
                    paddingBottom: 0,
                  }}
                  title="Cupons disponíveis"
                >
                  {availableCoupons
                    .filter((availableCoupon) => !rescuedCouponsIds.includes(availableCoupon.id))
                    .map((availableCoupon, index) => (
                      <RankingCoupon
                        key={availableCoupon.id}
                        enabled={userProgress.credits && userProgress.credits >= availableCoupon.credits}
                        onPress={() => handleWithCouponRescue(availableCoupon.id)}
                        title={availableCoupon.name}
                        description={availableCoupon.description}
                        credits={availableCoupon.credits}
                        customStyles={index === 0 ? {
                          paddingTop: 0,
                        } : {}}
                      />
                    ))}
                </Card>
              ) : null}

              {rescuedCoupons.length ? (
                <Card
                  cardStyles={{
                    paddingBottom: 0,
                  }}
                  title="Cupons resgatados"
                >
                  {rescuedCoupons.map((rescuedCoupon, index) => (
                    <RankingCoupon
                      rescued
                      key={rescuedCoupon.id}
                      title={rescuedCoupon.name}
                      description={rescuedCoupon.description}
                      credits={rescuedCoupon.credits}
                      couponCode={rescuedCoupon.couponUsers[0].code}
                      customStyles={index === 0 ? {
                        paddingTop: 0,
                      } : {}}
                    />
                  ))}
                </Card>
              ) : null}
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
