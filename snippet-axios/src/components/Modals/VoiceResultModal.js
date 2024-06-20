import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';

import {Colors, TextSizes} from '../../common';
import {Text} from '../index';

const VoiceResultModal = ({visible, setVisible, data, onSelect}) => {
  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(data).map(key => {
            if (data[key].length)
              return (
                <View key={key}>
                  <Text style={styles.key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                  {data[key].map(item => {
                    return (
                      <TouchableOpacity
                        onPress={() => onSelect({screen: key, item})}>
                        <Text>
                          {key === 'members' ? item.memberName : item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
          })}
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
  key: {
    fontSize: TextSizes.SubHeading,
    color: Colors.blue,
    marginBottom: '3%',
  },
});

export default VoiceResultModal;
