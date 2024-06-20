import React, {FC} from 'react';
import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Text} from '.';
import {Colors, Fonts, Routes} from '../common';
import {GameCard} from './Cards';
import {Game} from '../types';
import LangKeys from '../i18n/translations/LangKeys';
import {useTranslation} from 'react-i18next';

interface Props {
  title: string;
  data: Game[];
  id: string;
}

const List: FC<Props> = ({title, data = [], id}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}> {title}</Text>
        {/* @ts-ignore */}

        {data.length >= 6 && (
          <Pressable
            onPress={() =>
              // @ts-ignore
              navigation.navigate(Routes.CategoryGameListScreen, {id, title})
            }>
            <Text style={styles.seeAll}> {t(LangKeys.seeAll)}</Text>
          </Pressable>
        )}
      </View>
      {data.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.noGames}>{t(LangKeys.noGames)}</Text>
        </View>
      ) : (
        <FlatList
          data={data.slice(0, 5)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => {
            return (
              <View style={{marginRight: 15}}>
                <GameCard
                  name={item.game_name}
                  image={item.game_image}
                  joinFee={item.game_join_fee}
                  rating={item.game_rating}
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate(Routes.GameDetailScreen, {
                      gameId: item.game_id,
                    });
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noGames: {
    fontSize: 12,
    color: Colors.lightGray,
    fontFamily: Fonts.SemiBold,
  },
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAll: {
    fontSize: 12,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default List;
