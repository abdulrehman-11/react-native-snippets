import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Tts from 'react-native-tts';

import styles from './styles';
import {Screen, Text, ActivityIndicator, Field} from '../../../components';
import {AppHeader} from '../../../components/Headers';
import {Icons, Colors} from '../../../common';
import {
  addItemImage,
  deleteItemImage,
  getItem,
  getItemComments,
} from './helpers';
import {
  AIPromptResultModal,
  AlertModal,
  CommentsModal,
  VoiceSearchModal,
} from '../../../components/Modals';
import {FloatButton} from '../../../components/Buttons';
import SliderImagesPicker from '../BeoDetailScreen/SliderImagesPicker';
import {handleAIPropmpt} from '../MemberDetailScreen/helpers';

const ItemDetailScreen = ({route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [showMic, setShowMic] = useState(false);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [mode, setMode] = useState(false);
  const [check, setCheck] = useState(false);
  const [showVoiceSearchModal, setShowVoiceSearchModal] = useState(false);
  const [showVoiceResultModal, setShowVoiceResultModal] = useState(false);
  const [promptData, setPromptData] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getItem(id);
      const allComments = await getItemComments(id);
      setComments(allComments);
      if (result) setItem(result);

      result.image
        ? setImages([{id: null, image: result.image}, ...result.images])
        : setImages(result.images);
      setLoading(false);
    })();

    return () => {
      setItem({});
    };
  }, [check]);

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
      await Tts.speak(item.name);
    } catch (err) {
      console.log(`setDefaultLanguage error `, err);
    }
  };

  const handleImage = async image => {
    const obj = {
      item_id: item.id,
      images: [{image: image[0].image}],
    };
    setLoading(true);
    const response = await addItemImage(obj);
    setLoading(false);
    if (!response) return;
    setCheck(!check);
  };

  const onDeleteAccept = async () => {
    setMode(false);
    setLoading(true);
    const result = await deleteItemImage(image.id);
    setLoading(false);
    if (result) setImages(images.filter(item => item.id !== image.id));
    setImage(null);
  };

  const handleVoiceSearch = async search => {
    const response = await handleAIPropmpt({
      element_type: 'items',
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
        <AppHeader title="Details" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <ImagePicker image={item?.image} setImage={handleImage} memberImage /> */}
          <View>
            <Icons.FontAwesome5
              name="microphone"
              size={25}
              color={Colors.violet}
              onPress={() => setShowVoiceSearchModal(true)}
              style={{marginRight: 16, alignSelf: 'flex-end'}}
            />
          </View>
          <SliderImagesPicker
            images={[{image: item.image}]}
            setImage={handleImage}
          />

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item?.name}</Text>

            <TouchableOpacity onPress={onVoicePress}>
              <Icons.AntDesign name="sound" size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>

          <Field title="Location" value={item?.location} />
          <Field title="Price" value={'$' + item?.price} />
          <Field title="Category" value={item?.category} />
          <Field title="Description" value={item?.description} />
          <Field title="Alergy Concern" value={item?.allergy_concern} />
          <Field title="Gluten Status" value={item?.gluten_status} />
          <Field title="Recipe" value={item?.recipe} />
        </ScrollView>

        <FloatButton
          onPress={() => setShowCommentModal(true)}
          onMicPress={() => {
            setShowMic(true);
            setShowCommentModal(true);
          }}
        />

        <CommentsModal
          open={showCommentModal}
          setOpen={setShowCommentModal}
          itemId={id}
          comments={comments}
          setComments={setComments}
          name={item?.name}
          showMic={showMic}
          setShowMic={setShowMic}
        />
        <AlertModal
          title="Warning"
          description="Are you sure you want to delete this image?"
          visible={mode}
          setVisible={setMode}
          onAccept={onDeleteAccept}
        />
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

export default ItemDetailScreen;
