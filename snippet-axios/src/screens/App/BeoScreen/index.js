import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import {
  Screen,
  DatePicker,
  SearchBox,
  ActivityIndicator,
  Text,
} from '../../../components';
import {AppHeader} from '../../../components/Headers';
import {BeoCard} from '../../../components/Cards';
import {getAllBEO, searchEvents} from './herpers';
import {Routes} from '../../../common';
import {recreateUrl} from '../../../utils/helpers';
import styles from './styles';

const BeoScreen = ({navigation}) => {
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [searched, setSearched] = useState([]);
  const [events, setEvents] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    focused &&
      (async () => {
        setLoading(true);
        const result = await getAllBEO(date);
        if (result) setEvents(result);
        setLoading(false);
      })();

    return () => {
      setEvents([]);
    };
  }, [focused, date]);

  const List = ({data}) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Events</Text>;
    }

    return data.map((item, index) => {
      return (
        <BeoCard
          key={index}
          image={recreateUrl(item.image)}
          name={item.name}
          date={item.start_date}
          time={item.timing}
          location={item.location}
          comments={item.has_comments}
          updatedAt={item.updated_at}
          onPress={() =>
            navigation.navigate(Routes.BeoDetailScreen, {event: item})
          }
        />
      );
    });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader isBack={false} title="Events" />
        <SearchBox
          value={search}
          onChangeText={async text => {
            setSearch(text);
            const result = await searchEvents(text);
            if (result) setSearched(result);
          }}
          placeholder="Search events..."
          onClearPress={() => setSearch(null)}
        />
        <DatePicker setDate={setDate} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <List data={search ? searched : events} />
        </ScrollView>
      </Screen>
    </>
  );
};

export default BeoScreen;
