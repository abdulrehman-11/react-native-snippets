import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useNotifications} from '../../hooks';
import {Colors, Fonts, TextSizes, Icons, Routes} from '../../common';
import {Text} from '../index';
import {useUser, useAuth} from '../../hooks';
import {AlertModal, VoiceResultModal, VoiceSearchModal} from '../Modals';
import {CPNetwork, Urls} from '../../config';
import {showErrorMessage, showWarningMessage} from '../Toastify';

const AppHeader = ({title = '', isBack = true, notification = true}) => {
  const [mode, setMode] = useState(false);
  const [showSpeechModal, setShowSpeechModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const {hasNotifications} = useNotifications();
  const [voiceSearchResult, setVoiceSearchResult] = useState({});
  const navigation = useNavigation();
  const {user} = useUser();
  const {logOut} = useAuth();

  const handleVoiceSearch = async keyword => {
    const response = await CPNetwork.post(Urls.VoiceSearch, {keyword, title});

    if (!response.ok) return showErrorMessage(response.data.error);
    const {members, items, events, contentInfos, games} = response.data;
    if (
      members.length === 1 &&
      items.length === 0 &&
      events.length === 0 &&
      contentInfos.length === 0 &&
      games.length === 0
    ) {
      handleSelectedSearchValue({screen: 'members', item: members[0]});
    } else if (
      members.length === 0 &&
      items.length === 1 &&
      events.length === 0 &&
      contentInfos.length === 0 &&
      games.length === 0
    ) {
      handleSelectedSearchValue({screen: 'items', item: items[0]});
    } else if (
      members.length === 0 &&
      items.length === 0 &&
      events.length === 1 &&
      contentInfos.length === 0 &&
      games.length === 0
    ) {
      handleSelectedSearchValue({screen: 'events', item: events[0]});
    } else if (
      members.length === 0 &&
      items.length === 0 &&
      events.length === 0 &&
      contentInfos.length === 1 &&
      games.length === 0
    ) {
      handleSelectedSearchValue({
        screen: 'contentInfos',
        item: contentInfos[0],
      });
    } else if (
      members.length === 0 &&
      items.length === 0 &&
      events.length === 0 &&
      contentInfos.length === 0 &&
      games.length === 1
    ) {
      handleSelectedSearchValue({screen: 'games', item: games[0]});
    } else if (
      contentInfos.length === 0 &&
      members.length === 0 &&
      items.length === 0 &&
      events.length === 0 &&
      games.length === 0
    ) {
      showWarningMessage('No results found');
    } else {
      setVoiceSearchResult(response.data);
      setShowResultModal(true);
    }
  };

  const handleSelectedSearchValue = ({screen, item}) => {
    setShowResultModal(false);
    const route =
      screen === 'events'
        ? Routes.BeoDetailScreen
        : screen === 'members'
        ? Routes.MembersDetailScreen
        : screen === 'items'
        ? Routes.ItemDetailScreen
        : screen === 'contentInfos'
        ? Routes.ContentDetailScreen
        : screen === 'games'
        ? Routes.QuizStartScreen
        : '';

    if (screen !== 'events' && screen !== 'games')
      return navigation.navigate(route, {
        id: item.id,
      });

    navigation.navigate(
      route,
      screen === 'events'
        ? {event: item}
        : {
            quiz: item,
          },
    );
  };

  return (
    <View style={styles.container}>
      {!isBack && (
        <Icons.FontAwesome5
          name="microphone"
          size={25}
          color={Colors.violet}
          onPress={() => setShowSpeechModal(true)}
          style={{marginLeft: 16}}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          if (isBack) {
            navigation.goBack();
          }
        }}
        style={styles.iconContainer}>
        {isBack ? (
          <Image
            source={require('../../../assets/Images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        ) : user && user.is_receptionist ? (
          <Icons.MaterialIcons
            name="logout"
            onPress={() => setMode(true)}
            size={30}
            color={Colors.violet}
          />
        ) : null}
      </TouchableOpacity>

      <AlertModal
        visible={mode}
        setVisible={setMode}
        title="Warning"
        description="Are you sure you want to logout?"
        onAccept={() => logOut()}
      />
      {showSpeechModal && (
        <VoiceSearchModal
          visible={showSpeechModal}
          setVisible={setShowSpeechModal}
          onSearch={handleVoiceSearch}
        />
      )}

      <VoiceResultModal
        data={voiceSearchResult}
        visible={showResultModal}
        setVisible={setShowResultModal}
        onSelect={handleSelectedSearchValue}
      />

      <View style={styles.centerblock}>
        <Text
          style={{
            ...styles.title,
            fontSize:
              title.length > 15 ? TextSizes.mediumText : TextSizes.SubHeading,
          }}>
          {title}
        </Text>
      </View>
      {notification && (
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.NotificationScreen)}
          style={styles.block}>
          <View style={styles.countContainer}>
            <Text style={{color: Colors.WHITE, fontSize: TextSizes.smallText}}>
              {hasNotifications}
            </Text>
          </View>
          <Icons.Feather name="bell" size={25} color={Colors.violet} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    marginBottom: '2%',
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
    justifyContent: 'space-evenly',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  title: {
    fontFamily: Fonts.SemiBold,
    color: Colors.violet,
  },
  iconContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerblock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countContainer: {
    position: 'absolute',
    left: 35,
    bottom: 10,
    zIndex: 1,
    backgroundColor: Colors.darkBlue,
    width: 20,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default AppHeader;
