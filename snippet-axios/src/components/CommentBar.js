import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {Colors, Icons} from '../common';
import {VoiceSearchModal} from './Modals';

const CommentBar = ({value, setValue, onSend, showMic = false}) => {
  const [showSpeechModal, setShowSpeechModal] = useState(false);

  const handleSearch = text => {
    setValue(text);
    setShowSpeechModal(false);
  };

  useEffect(() => {
    if (showMic) setShowSpeechModal(true);
  }, [showMic]);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Add comment"
          style={styles.textInput}
          placeholderTextColor={Colors.lightGrey}
        />
        <TouchableOpacity>
          <Icons.FontAwesome5
            name="microphone"
            size={25}
            color={Colors.black}
            onPress={() => setShowSpeechModal(true)}
            style={{marginRight: 16}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSend}>
          <Icons.Feather name="send" color={Colors.black} size={30} />
        </TouchableOpacity>
      </View>
      {!!showSpeechModal && (
        <VoiceSearchModal
          visible={showSpeechModal}
          setVisible={setShowSpeechModal}
          fromComments
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    justifyContent: 'space-around',
  },
  textInput: {
    width: '85%',
    height: '100%',
    color: Colors.black,
  },
});

export default CommentBar;
