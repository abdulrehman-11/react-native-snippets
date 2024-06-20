import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Screen, ActivityIndicator, Text, Field} from '../../../components';
import {AppHeader} from '../../../components/Headers';
import {
  getSingleEvent,
  getEventComments,
  addBeoImage,
  deleteBeoImage,
} from './helpers';
import {
  AIPromptResultModal,
  AlertModal,
  CommentsModal,
  VoiceSearchModal,
} from '../../../components/Modals';
import {Icons, Routes, Colors} from '../../../common';
import {FloatButton} from '../../../components/Buttons';
import SliderImagesPicker from './SliderImagesPicker';
import {handleAIPropmpt} from '../MemberDetailScreen/helpers';

const BeoDetailScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState();
  const [showVoiceSearchModal, setShowVoiceSearchModal] = useState(false);
  const [showVoiceResultModal, setShowVoiceResultModal] = useState(false);
  const [promptData, setPromptData] = useState(null);
  const [notes, setNotes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState(false);
  const [image, setImage] = useState();
  const [showMic, setShowMic] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getSingleEvent(route.params.event.id);
      const response = await getEventComments(route.params.event.id);
      setComments(response);

      setEvent(result);
      result.image
        ? setImages([{id: null, image: result.image}, ...result.images])
        : setImages(result.images);

      setNotes(result.notes.reverse());
      setLoading(false);
    })();
  }, [check]);

  const RenderPdf = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.BeoDocumentScreen, {
              PDFS: event.event_pdf,
            });
          }}
          style={styles.viewPdfContainer}>
          <Text>View Documents</Text>
        </TouchableOpacity>
      </>
    );
  };

  const handleImage = async images => {
    setLoading(true);
    const response = await addBeoImage({event_id: event.id, images});
    setLoading(false);
    if (!response) return;
    setCheck(!check);
  };

  const onDeleteAccept = async () => {
    setMode(false);
    setLoading(true);
    const result = await deleteBeoImage(image.id);
    setLoading(false);
    if (result) setImages(images.filter(item => item.id !== image.id));
    setImage(null);
  };

  const handleVoiceSearch = async search => {
    const response = await handleAIPropmpt({
      element_type: 'events',
      element_id: route.params.event.id,
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
        <AppHeader title="Event Detail" />
        {event ? (
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
            <SliderImagesPicker
              images={images}
              setImage={handleImage}
              onDelete={image => {
                setImage(image);
                setMode(true);
              }}
            />
            <Text style={styles.name}>{event.name}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{alignSelf: 'center', maxWidth: '30%'}}>
                {event.start_date}
              </Text>
              <Text style={{alignSelf: 'center', maxWidth: '30%'}}>
                {event.location}
              </Text>
              <Text style={{alignSelf: 'center', maxWidth: '40%'}}>
                {event.timing}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {!!event?.event_pdf.length && RenderPdf()}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.RezScreen, {id: event.id})
                }
                style={styles.viewPdfContainer}>
                <Text style={{textAlign: 'center'}}>View Participants</Text>
              </TouchableOpacity>
            </View>

            {notes.map((item, index) => {
              return (
                <Field
                  key={index}
                  title={`Note ${notes.length - index}`}
                  value={item.description}
                  time={item.timeStamp}
                />
              );
            })}
          </ScrollView>
        ) : null}

        <CommentsModal
          open={showCommentModal}
          setOpen={setShowCommentModal}
          eventId={route.params.event.id}
          comments={comments}
          name={event?.name}
          setComments={setComments}
          showMic={showMic}
          setShowMic={setShowMic}
        />
        <FloatButton
          onPress={() => setShowCommentModal(true)}
          onMicPress={() => {
            setShowMic(true);
            setShowCommentModal(true);
          }}
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

export default BeoDetailScreen;
