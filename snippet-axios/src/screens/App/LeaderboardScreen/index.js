import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native';

import styles from './styles';
import {ActivityIndicator, Screen, Text} from '../../../components';
import {AppHeader} from '../../../components/Headers';
import {LeaderBoardCard} from '../../../components/Cards';
import {getLeaderBoard} from './herpers';

const LeaderBoardScreen = () => {
  const [loading, setLoading] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    focused &&
      (async () => {
        setLoading(true);
        const result = await getLeaderBoard();
        if (result) setLeaderBoard(result);
        setLoading(false);
      })();

    return () => {
      setLeaderBoard([]);
    };
  }, [focused]);

  const List = ({data}) => {
    if (!data.length) {
      return <Text style={styles.noText}>No record</Text>;
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(item => {
          return <LeaderBoardCard name={item.name} points={item.userPoints} />;
        })}
      </ScrollView>
    );
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader title="Leader board" />

        <List data={leaderBoard} />
      </Screen>
    </>
  );
};

export default LeaderBoardScreen;
