import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {useIsFocused} from '@react-navigation/native';
import uuid from 'react-native-uuid';

import {
  getGames,
  handleRestart,
  getContentInfo,
  getNotificationsCount,
} from './helpers';
import {Screen, ActivityIndicator, Text} from '../../../components';
import {ContentCard, GameCard} from '../../../components/Cards';
import {AlertModal} from '../../../components/Modals';
import {AppHeader} from '../../../components/Headers';
import {Routes, Icons, Colors} from '../../../common';
import {useUser, useNotifications, useDepartmentId} from '../../../hooks';
import {showWarningMessage} from '../../../components/Toastify';
import {handleUpdateProfile} from '../EditProfileScreen/helpers';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [restartModalVisible, setRestartModalVisible] = useState(false);
  const [oneTimeModal, setOneTimeModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState();
  const [category, setCategory] = useState('2');
  const {user, GetUser} = useUser();
  const {setHasNotifications} = useNotifications();
  const focused = useIsFocused();
  const {departmentId, setDepartmentId} = useDepartmentId();

  useEffect(() => {
    GetUser();
    setDepartmentId(user?.employee_type_id);
  }, []);

  useEffect(() => {
    (async () => {
      const notifications = await getNotificationsCount();
      setHasNotifications(notifications);
    })();
    (async () => {
      setLoading(true);
      const result = await getGames(departmentId);
      if (result) setGames(result);
      setLoading(false);
    })();

    (async () => {
      setLoading(true);
      const result2 = await getContentInfo(departmentId);

      if (result2) setContent(result2);
      setLoading(false);
    })();

    return () => {
      setGames([]);
    };
  }, [departmentId, focused, category]);

  useEffect(() => {
    (async () => {
      OneSignal.promptForPushNotificationsWithUserResponse(res => {});

      OneSignal.setLogLevel(6, 0);
      OneSignal.setAppId('ec766714-2888-4fcf-ac84-271137690f55');

      if (user?.user_notification_id) {
        OneSignal.setExternalUserId(user?.user_notification_id);
      } else {
        const uuidCreated = uuid.v4();
        OneSignal.setExternalUserId(uuidCreated);
        handleUpdateProfile(
          null,
          user?.name,
          user?.email,
          user?.user_name,
          user?.phone_number,
          user?.calling_code,
          user?.country_code,
          null,
          uuidCreated,
        );
      }
    })();
  }, []);

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      const data = notification.additionalData;
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  OneSignal.setNotificationOpenedHandler(({notification}) => {
    if (notification?.additionalData?.event_id) {
      navigation.navigate(Routes.BeoDetailScreen, {
        event: JSON.parse(notification?.additionalData?.event_id),
      });
    }
  });

  const handleGameCardSelect = item => {
    setSelectedQuiz(item);
    if (item.is_one_time && item.attempts >= 1) {
      return showWarningMessage('You can not play this quiz again!');
    } else if (item.is_one_time) {
      return setOneTimeModal(true);
    }
    if (item.questionNo === item.questionsCount) {
      return setRestartModalVisible(true);
    }
    navigation.navigate(Routes.QuizStartScreen, {quiz: item});
  };

  const List = ({data}) => {
    if (!data.length) {
      return (
        <View style={styles.noGameContainer}>
          <Icons.SimpleLineIcons
            name="game-controller"
            color={Colors.blue}
            size={100}
          />
          <Text style={styles.noText}>No Games</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => (
          <GameCard
            title={item.heading}
            game={item.questionsCount}
            onPress={() => handleGameCardSelect(item)}
          />
        )}
      />
    );
  };

  const List2 = ({data}) => {
    if (!data.length) {
      return (
        <View style={styles.noGameContainer}>
          <Text style={styles.noText}>No Content</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <ContentCard
            title={item.heading}
            onPress={() => {
              navigation.navigate(Routes.ContentDetailScreen, {id: item.id});
            }}
          />
        )}
      />
    );
  };

  const Options = () => {
    return (
      <View style={styles.options}>
        <TouchableOpacity
          style={category === '1' ? styles.selectedOption : {}}
          onPress={() => setCategory('1')}>
          <Text style={category === '1' ? styles.selectedOptionText : {}}>
            Games
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={category === '2' ? styles.selectedOption : {}}
          onPress={() => setCategory('2')}>
          <Text style={category === '2' ? styles.selectedOptionText : {}}>
            Content
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader
          isBack={false}
          title={category === '1' ? 'Games' : 'Content'}
        />
        <Options />
        {category === '1' ? <List data={games} /> : <List2 data={content} />}
        <AlertModal
          visible={restartModalVisible}
          setVisible={setRestartModalVisible}
          title="Notice"
          description="You have already completed this quiz. Would you like to play again?"
          onAccept={async () => {
            setLoading(true);
            setRestartModalVisible(false);
            await handleRestart(selectedQuiz, navigation);
            setLoading(false);
          }}
        />
        <AlertModal
          visible={oneTimeModal}
          setVisible={setOneTimeModal}
          title="Notice"
          description="This quiz is only allowed to be played once. Do you want to continue?"
          onAccept={() => {
            navigation.navigate(Routes.QuizStartScreen, {quiz: selectedQuiz});
          }}
        />
      </Screen>
    </>
  );
};

export default HomeScreen;
