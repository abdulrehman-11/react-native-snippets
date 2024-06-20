import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Voice from '@react-native-voice/voice';

import {Colors, TextSizes} from '../../common';
import {Text} from '../index';
import {Button} from '../Buttons';

const VoiceSearchModal = ({
  visible,
  setVisible,
  onSearch,
  fromComments = false,
}) => {
  const [showListening, setShowListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChangedHandler;

    startListening();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log({errorListening: error});
    }
  };
  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log({errorStopping: error});
    }
  };
  const onSpeechStartHandler = e => {
    setShowListening(true);
  };

  const onSpeechEndHandler = async e => {
    setShowListening(false);
  };
  const onSpeechVolumeChangedHandler = async e => {
    // setShowListening(false);
  };

  const onSpeechResultsHandler = e => {
    setText(e.value);
  };

  const handleSearch = () => {
    stopListening();
    setVisible(false);
    onSearch(text[0]);
  };

  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        {showListening && (
          <View style={{...styles.row, marginBottom: '5%'}}>
            <View style={styles.animationContainer}>
              {/* <LottieView
                source={require('../../../assets/animations/loading.json')}
                autoPlay
                loop
              /> */}
            </View>
            <Text style={{fontSize: TextSizes.ExtraLargeHeading}}>
              Listening
            </Text>
          </View>
        )}
        {!fromComments ? (
          <>
            <Text style={styles.exampleStyle}>Say "Member Name"</Text>
            <Text style={styles.exampleStyle}>Say "Event Name"</Text>
            <Text style={styles.exampleStyle}>Say "Item Name"</Text>
          </>
        ) : (
          <Text style={styles.exampleStyle}>Try saying somthing</Text>
        )}
        <View style={{...styles.row, margin: '5%'}}>
          {text ? <Text>{text}</Text> : null}
        </View>
        <Button
          gradient
          title={fromComments ? 'Done' : 'Search'}
          onPress={handleSearch}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    // justifyContent: 'center',
    paddingVertical: '30%',
    borderRadius: 10,
  },
  animationContainer: {
    position: 'absolute',
    width: '90%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  exampleStyle: {
    fontSize: TextSizes.mediumText,
    alignSelf: 'center',
    color: Colors.lightGrey,
  },
});

export default VoiceSearchModal;
