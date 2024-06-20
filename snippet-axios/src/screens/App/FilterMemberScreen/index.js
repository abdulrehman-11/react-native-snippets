import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Routes} from '../../../common';

import {ActivityIndicator, Screen, SearchBox, Text} from '../../../components';
import {MemberCard} from '../../../components/Cards';
import {AppHeader} from '../../../components/Headers';
import {recreateUrl} from '../../../utils/helpers';
import {getFilterMembers} from './helpers';
import styles from './styles';

const FilterMemberScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searched, setSearched] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    (async () => {
      setShowMessage(false);
      setLoading(true);
      const result = await getFilterMembers(id);
      setLoading(false);
      if (result.length === 0) setShowMessage(true);
      setFilteredMembers(result);
    })();
  }, []);

  const handleSearch = keyWords => {
    setSearched(
      filteredMembers.filter(item =>
        item.memberName.toLowerCase().includes(keyWords.toLowerCase()),
      ),
    );
  };

  const List = ({data}) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Members</Text>;
    }

    return data.map(item => {
      return (
        <MemberCard
          key={item.id}
          image={recreateUrl(item.image)}
          name={item.memberName}
          comments={item.has_comments}
          memberStatusColor={item.memberStatus}
          onPress={() =>
            navigation.navigate(Routes.MembersDetailScreen, {
              id: item.id,
            })
          }
        />
      );
    });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <View style={styles.container}>
          <AppHeader title="Grouped Members" />
          <SearchBox
            value={search}
            onClearPress={() => {
              setSearch('');
              setSearched([]);
            }}
            onChangeText={text => {
              handleSearch(text);
              setSearch(text);
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <List data={search ? searched : filteredMembers} />
            <View style={{marginTop: 100}} />
          </ScrollView>
        </View>
      </Screen>
    </>
  );
};

export default FilterMemberScreen;
