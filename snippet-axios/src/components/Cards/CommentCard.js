import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';

import {Text} from '..';
import {Colors, Fonts, Icons, TextSizes} from '../../common';
import {useUser} from '../../hooks';
import {CPNetwork, Urls} from '../../config';
import {showErrorMessage} from '../Toastify';
import TranlationLanguagesModal from '../Modals/TranlationLanguagesModal';

const CommentCard = ({
  userId,
  image,
  name,
  comment,
  createdAt,
  onDelete,
  id,
  showTranlationIcon,
  translations,
}) => {
  const [currentLang, setCurrentLang] = useState('en');
  const [translatedComment, setTranslatedComment] = useState('');
  const [translationsModalVisible, setTranslationsModalVisible] =
    useState(false);
  const {user} = useUser();
  const showDelete = user.id === userId;

  const handleName = nameString => {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  };

  const handleTranslateComment = async targetLang => {
    if (translations !== null) {
      if (targetLang === 'es') {
        setTranslatedComment(JSON.parse(translations).es);
        setCurrentLang('es');
      } else if (targetLang === 'en') {
        setTranslatedComment(JSON.parse(translations).en);
        setCurrentLang('en');
      }
    } else {
      const response = await CPNetwork.post(Urls.TranslateComment, {
        comment_id: id,
        lang: targetLang,
      });

      if (!response.ok) {
        showErrorMessage('Failed to translate comment');
      } else {
        const {translated_comment} = response.data;
        setTranslatedComment(translated_comment);
        setCurrentLang(targetLang);
      }
    }
  };

  return (
    <View style={{marginBottom: 10}}>
      <View style={styles.container}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <View style={styles.nameInitialContainer}>
            <Text style={{color: Colors.WHITE}}>{handleName(name)}</Text>
          </View>
        )}
        <View style={styles.nameContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={styles.name}>{name}</Text>
            {!!showTranlationIcon && (
              // <TouchableOpacity
              //   onPress={handleTranslateComment}
              //   style={{borderWidth: 1, padding: 3, borderRadius: 50}}>
              //   <Text style={{fontSize: 12}}>
              //     {currentLang === 'es' ? 'EN' : 'ES'}
              //   </Text>
              // </TouchableOpacity>
              <Icons.MaterialCommunityIcons
                name="google-translate"
                size={30}
                onPress={() => setTranslationsModalVisible(true)}
              />
            )}
          </View>

          <Text style={styles.comment}>{translatedComment || comment}</Text>
        </View>
      </View>
      <View
        style={{
          ...styles.timeContainer,
          justifyContent: !showDelete ? 'flex-start' : 'space-between',
        }}>
        <Text style={styles.date}>
          {moment(createdAt).format('hh:mm A')}
          {'   '}
          {moment(createdAt).format('DD MMMM YYYY')}
        </Text>

        {showDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.delete}>delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <TranlationLanguagesModal
        visible={translationsModalVisible}
        setVisible={setTranslationsModalVisible}
        onAccept={handleTranslateComment}
        currentLanguage={currentLang}
        languages={[
          {label: 'English', value: 'en'},
          {label: 'Spanish', value: 'es'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameContainer: {
    marginLeft: 10,
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 10,
    maxWidth: 300,
    alignSelf: 'flex-start',
  },
  name: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    width: '70%',
  },
  comment: {
    width: 280,
    fontSize: 14,
  },
  nameInitialContainer: {
    backgroundColor: Colors.darkBlue,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: TextSizes.smallText,
    marginLeft: '18%',
  },
  delete: {
    textDecorationLine: 'underline',
    fontSize: 12,
    color: Colors.RED,
    marginRight: '5%',
  },
  timeContainer: {
    flexDirection: 'row',
  },
});

export default CommentCard;
