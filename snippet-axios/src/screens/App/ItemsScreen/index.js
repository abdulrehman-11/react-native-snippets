import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Screen, SearchBox, Text, ActivityIndicator} from '../../../components';
import {AppHeader} from '../../../components/Headers';
import {MemberCard} from '../../../components/Cards';
import {Routes} from '../../../common';
import {getItems, searchItems} from './herpers';
import {useUser} from '../../../hooks';
import {recreateUrl} from '../../../utils/helpers';
import {Colors} from '../../../common';
import styles from './styles';

const ItemsScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [searched, setSearched] = useState([]);
  const {user} = useUser();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      (async () => {
        setLoading(true);
        const result = await getItems();
        if (result) setItems(result);
        setLoading(false);
      })();

    return () => {
      setItems([]);
    };
  }, [user?.employee_type_id, isFocused]);

  const List = ({data}) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Items</Text>;
    }

    return data.map(item => {
      return (
        <MemberCard
          key={item.id}
          image={recreateUrl(item.image)}
          name={item.name}
          comments={item.comment_count}
          onPress={() =>
            navigation.navigate(Routes.ItemDetailScreen, {
              id: item.id,
            })
          }
        />
      );
    });
  };

  const ItemFilter = ({onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.filterContainer}>
        <Text style={{color: Colors.darkBlue}}> Groups</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader isBack={false} title="Items" />
        <SearchBox
          value={search}
          onChangeText={async text => {
            setSearch(text);
            const result = await searchItems(text);
            if (result) setSearched(result);
          }}
          placeholder="Search items..."
          onClearPress={() => setSearch(null)}
        />
        <ItemFilter
          onPress={() =>
            navigation.navigate(Routes.FilterListScreen, {type: 'item'})
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <List data={search ? searched : items} />
        </ScrollView>
      </Screen>
    </>
  );
};

export default ItemsScreen;
