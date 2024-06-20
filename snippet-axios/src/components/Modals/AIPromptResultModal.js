import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';

import {Colors, Icons} from '../../common';
import {Text} from '../index';

const AIPromptResultModal = ({visible, setVisible, data}) => {
  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        <Icons.AntDesign
          name="closecircleo"
          color="red"
          onPress={() => setVisible(false)}
          size={20}
          style={{
            alignSelf: 'flex-end',
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>{data}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: '5%',
    borderRadius: 10,
    maxHeight: '60%',
  },
});

export default AIPromptResultModal;
