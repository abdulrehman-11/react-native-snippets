import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Tts from 'react-native-tts';

import {
  Screen,
  ActivityIndicator,
  Text,
  ImagePicker,
} from '../../../components';
import styles from './styles';
import {Colors, Icons} from '../../../common';
import {AppHeader} from '../../../components/Headers';
import {
  AIPromptResultModal,
  CommentsModal,
  VoiceSearchModal,
} from '../../../components/Modals';
import {FloatButton} from '../../../components/Buttons';
import {useMembers, useUser} from '../../../hooks';
import {
  getMember,
  getMemberComments,
  handleAIPropmpt,
  handleImageUpload,
} from './helpers';

const MemberDetailScreen = ({route}) => {
  const {id} = route.params;
  const [memberID, setMemberID] = useState(id);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [showMic, setShowMic] = useState(false);
  const [showVoiceSearchModal, setShowVoiceSearchModal] = useState(false);
  const [showVoiceResultModal, setShowVoiceResultModal] = useState(false);
  const [promptData, setPromptData] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const {members, setMembers} = useMembers();
  const {user} = useUser();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getMember(memberID);
      const allComments = await getMemberComments(memberID);
      setComments(allComments);
      if (result) setMember(result);
      setLoading(false);
    })();

    return () => {
      setMember({});
      setComments([]);
    };
  }, [memberID]);

  useEffect(() => {
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
    Tts.addEventListener('tts-resume', event => console.log('resume', event));
    Tts.addEventListener('tts-finish', event => console.log('finish', event));
    Tts.addEventListener('tts-progress', event =>
      console.log('progress', event),
    );
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.getInitStatus().then(initTts);
  }, []);

  const initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      })
      .filter(v => v.language === 'en-US');

    let selectedVoice = null;
    if (availableVoices.length > 0) {
      selectedVoice = availableVoices[0].id;
      try {
        await Tts.requestInstallData();

        await Tts.setDefaultLanguage(availableVoices[0].language);
      } catch (err) {
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(availableVoices[0].id);

      await Tts.setDefaultPitch(1.0);
      await Tts.setDefaultRate(0.5);
      setSelectedVoice(selectedVoice);
    }
  };

  const onVoicePress = async () => {
    try {
      await Tts.setDucking(true);

      await Tts.setDefaultLanguage('en-US');
      await Tts.setDefaultVoice(selectedVoice);
      await Tts.speak(member.memberName);
    } catch (err) {
      console.log(`setDefaultLanguage error `, err);
    }
  };

  const Field = ({title, value, spouse, onPress}) => {
    return (
      <>
        <View style={{marginLeft: '5%'}}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {spouse ? (
          <TouchableOpacity onPress={onPress} style={styles.valuesContainer}>
            <Text style={{textDecorationLine: 'underline', color: Colors.blue}}>
              {value}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.valuesContainer}>
            <Text>{value ? value : 'None'}</Text>
          </View>
        )}
      </>
    );
  };

  const handleImage = async image => {
    setLoading(true);
    const newImage = await handleImageUpload(image, member.id);
    setLoading(false);
    if (newImage) {
      setMembers(
        members.map(item => {
          if (item.id === member.id) {
            return {...item, image: newImage};
          }
          return item;
        }),
      );
      setMember({...member, image: newImage});
    }
  };

  const handleVoiceSearch = async search => {
    const response = await handleAIPropmpt({
      element_type: 'members',
      element_id: id,
      prompt: search,
    });
    setPromptData(response);
    setShowVoiceSearchModal(false);
    setShowVoiceResultModal(true);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader title="Member Details" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Icons.FontAwesome5
              name="microphone"
              size={25}
              color={Colors.violet}
              onPress={() => setShowVoiceSearchModal(true)}
              style={{marginRight: 16, alignSelf: 'flex-end'}}
            />
          </View>

          <ImagePicker
            image={member?.image}
            setImage={handleImage}
            memberImage
          />

          <View style={styles.nameContainer}>
            {user && !user.is_receptionist ? (
              <Text style={styles.name}>{member?.memberId}</Text>
            ) : null}
            <Text style={styles.name}>{member?.memberName}</Text>

            <TouchableOpacity onPress={onVoicePress}>
              <Icons.AntDesign name="sound" size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>

          {member?.family && member?.family?.length > 0 ? (
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.title}>Family</Text>
            </View>
          ) : null}

          {member?.family && member?.family?.length > 0 ? (
            member?.family?.map((item, index) => {
              return (
                <Field
                  key={index}
                  title={''}
                  spouse={item.name}
                  value={item.name}
                  onPress={() => setMemberID(item?.id)}
                />
              );
            })
          ) : member?.spouseName ? (
            <Field
              title="Spouse"
              value={member?.spouseName}
              spouse={member?.spouseName}
              onPress={() => setMemberID(member?.spouseId)}
            />
          ) : null}

          <Field title="Type" value={member?.member_type} />
          <Field title="Birth Day" value={member?.birthdate} />
          <Field title="Anniversery" value={member?.anniversary} />
          {user && !user.is_receptionist ? (
            <>
              <Field title="Preferences" value={member?.fandb} />
              <Field title="Health Considerations" value={member?.dietary} />
              <Field title="Locker Number" value={member?.member_locker} />
              <Field title="Bag Storage" value={member?.member_bag_storage} />
              <Field title="Notes" value={member?.family_notes} />
            </>
          ) : null}

          <CommentsModal
            open={showCommentModal}
            setOpen={setShowCommentModal}
            memberId={id}
            comments={comments}
            setComments={setComments}
            name={member?.memberName}
            showMic={showMic}
            setShowMic={setShowMic}
          />
        </ScrollView>
        {user && !user.is_receptionist && (
          <FloatButton
            onPress={() => setShowCommentModal(true)}
            onMicPress={() => {
              setShowMic(true);
              setShowCommentModal(true);
            }}
          />
        )}

        {showVoiceSearchModal && (
          <VoiceSearchModal
            visible={showVoiceSearchModal}
            setVisible={setShowVoiceSearchModal}
            onSearch={handleVoiceSearch}
          />
        )}

        <AIPromptResultModal
          visible={showVoiceResultModal}
          setVisible={setShowVoiceResultModal}
          data={promptData}
        />
      </Screen>
    </>
  );
};

export default MemberDetailScreen;
