import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator as AI,
  TouchableOpacity,
  View,
} from 'react-native';

import {Screen, SearchBox, Text} from '../../../components';
import {MemberCard} from '../../../components/Cards';
import {AppHeader} from '../../../components/Headers';
import {Colors, Routes} from '../../../common';
import {useMembers, useUser} from '../../../hooks';
import {getMembers} from './herpers';
import {recreateUrl} from '../../../utils/helpers';
import {config, CPNetwork, Urls} from '../../../config';
import {debounce} from '../../../utils/helpers';
import styles from './styles';

const MembersScreen = ({navigation}) => {
  const {members, setMembers} = useMembers();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [searched, setSearched] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [showNoMembers, setShowNoMembers] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getMembers(offSet);
      if (!members.length && !result.length) setShowNoMembers(true);
      setMembers([...members, ...result]);
      setLoading(false);
    })();
  }, [offSet, user?.employee_type_id]);

  const searchMember = async text => {
    const response = await CPNetwork.get(
      Urls.MemberSearch + text,
      (
        await config()
      ).headers,
    );
    if (!response.ok) {
      showErrorMessage('Failed to search');
      return;
    }

    const {members} = response.data;
    setSearched(members);
  };

  const searchedMembersList = list => {
    return (
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.memberId + index}
        ListFooterComponent={
          <AI animating={loading} size="large" color={Colors.darkBlue} />
        }
        renderItem={({item}) => {
          return (
            <MemberCard
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
        }}
      />
    );
  };

  const membersList = (list = []) => {
    return (
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        keyExtractor={(item, index) => item.memberId + index}
        onEndReached={() => {
          if (list.length >= 10) {
            setOffSet(offSet + 10);
          }
        }}
        ListFooterComponent={
          <AI animating={loading} size="large" color={Colors.darkBlue} />
        }
        renderItem={({item}) => {
          return (
            <MemberCard
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
        }}
      />
    );
  };

  const Filters = ({onPress, title}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.filterContainer}>
        <Text style={{color: Colors.darkBlue}}> {title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <AppHeader isBack={false} title="Members" />
      <SearchBox
        value={search}
        onChangeText={text => {
          debounce(searchMember, text);
          setSearch(text);
        }}
        placeholder="Search members..."
        onClearPress={() => {
          setSearch(null);
          setSearched([]);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}>
        <Filters
          title="Member Groups"
          onPress={() =>
            navigation.navigate(Routes.FilterListScreen, {type: 'member'})
          }
        />
        <Filters
          title="Sport Groups"
          onPress={() =>
            navigation.navigate(Routes.FilterListScreen, {type: 'sport'})
          }
        />
      </View>
      {!showNoMembers ? (
        search ? (
          searchedMembersList(searched)
        ) : (
          membersList(members)
        )
      ) : (
        <Text style={styles.noText}>No Members</Text>
      )}
    </Screen>
  );
};

export default MembersScreen;
