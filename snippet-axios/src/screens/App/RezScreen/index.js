import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';

import styles from './styles';
import {Screen, ActivityIndicator, Text, SearchBox} from '../../../components';
import {AppHeader} from '../../../components/Headers';
import {RezCard} from '../../../components/Cards';
import {getReservations} from './herpers';
import {Routes} from '../../../common';

const RezScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getReservations(id);
      if (result) setReservations(result);
      setLoading(false);
    })();

    return () => {
      setReservations([]);
    };
  }, []);

  const List = ({data}) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Reservations</Text>;
    }

    return data
      .filter(item => {
        if (item.memberName.includes(search)) {
          return item;
        }
      })
      ?.map(item => {
        if (!item.is_deleted)
          return (
            <RezCard
              memberStatusColor={item.memberStatus}
              placement={item.table}
              employee={item.employee}
              name={item.memberName}
              image={item.image}
              time={item.timing}
              location={item.location}
              onPress={() =>
                navigation.navigate(Routes.RezDetailScreen, {res: item})
              }
            />
          );
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader title="Reservations" />
        <SearchBox
          value={search}
          onChangeText={setSearch}
          onClearPress={() => setSearch('')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <List data={reservations} />
        </ScrollView>
      </Screen>
    </>
  );
};

export default RezScreen;
