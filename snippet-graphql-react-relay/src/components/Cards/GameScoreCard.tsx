import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';

import {Colors, Icons} from '../../common';
import {Text} from '..';
import type {TournamentPlayer} from '../../types';
import LangKeys from '../../i18n/translations/LangKeys';

interface Props {
  player: TournamentPlayer;
}

const GameScoreCard: FC<Props> = ({player}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={{uri: player.player_avatar}} style={styles.image} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '81%',
        }}>
        <View style={styles.detailContainer}>
          <Text style={styles.name}>{player.player_name}</Text>
          <Text style={styles.score}>
            {t(LangKeys.score)} : {player.player_score || 0}
          </Text>
        </View>
        {/* <Text style={styles.date}>{dayjs().format('MMMM DD,YYYY')}</Text> */}
      </View>
      {!!player.is_winner && (
        <Icons.SimpleLineIcons name="badge" size={30} color={Colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingLeft: 8,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '88%',
  },
  image: {
    width: 44,
    height: 44,
    objectFit: 'contain',
    marginRight: 20,
    borderRadius: 50,
  },
  detailContainer: {},
  name: {
    fontSize: 12,
    color: Colors.primary,
    lineHeight: 15.84,
    letterSpacing: -0.41,
    fontWeight: '400',
  },
  score: {
    fontSize: 10,
    lineHeight: 15.84,
    letterSpacing: -0.41,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  date: {
    color: Colors.grey,
    fontSize: 10,
    lineHeight: 13.2,
    letterSpacing: -0.41,
  },
});

export default GameScoreCard;
