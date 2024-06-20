import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ImagePickerCrop from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import {Colors, Icons, TextSizes} from '../common';
import {Text} from './index';
import {Button} from './Buttons';

const ImagePicker = ({image, setImage, memberImage = false}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectImage = async () => {
    try {
      const NewImage = await ImagePickerCrop.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
        cropping: true,
      });

      setImage(`data:${NewImage.mime};base64,${NewImage.data}`);
    } catch (error) {
      console.log('Image error : ', error);
    }
  };

  const captureImage = async () => {
    try {
      const image = await ImagePickerCrop.openCamera({
        width: 400,
        height: 400,
        includeBase64: true,
        compressImageQuality: 0.5,
      });

      setImage(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      console.log('Image error : ', error);
    }
  };

  const handlePress = name => {
    setModalVisible(false);
    name === 'camera'
      ? setTimeout(() => {
          captureImage();
        }, 1000)
      : setTimeout(() => {
          selectImage();
        }, 1000);
  };

  const HeaderContent = () => {
    return (
      <Button
        title="Close"
        gradient
        onPress={() => {
          setModalVisible(false);
        }}
      />
    );
  };

  const ContentModal = () => {
    return (
      <View style={styles.modelMainContainer}>
        {HeaderContent()}
        <View style={styles.containerContent}>
          <TouchableOpacity
            onPress={() => handlePress('camera')}
            style={styles.iconContainer2}>
            <Icons.FontAwesome5
              name="camera"
              size={50}
              color={Colors.darkBlue}
            />
            <Text style={styles.iconName}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress('gallery')}
            style={styles.iconContainer2}>
            <Icons.Entypo name="images" size={50} color={Colors.darkBlue} />
            <Text style={styles.iconName}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (memberImage) {
    return (
      <>
        <View>
          <Image
            source={{uri: image}}
            style={styles.personImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.imageIconContainer}>
            <Icons.Feather name="camera" size={25} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <Modal isVisible={modalVisible}>{ContentModal()}</Modal>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <Icons.Ionicons name="person" size={25} color={Colors.darkBlue} />
        )}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconContainer}>
          <Icons.Ionicons name="camera" size={20} color={Colors.darkBlue} />
        </TouchableOpacity>
      </View>
      <Modal isVisible={modalVisible}>{ContentModal()}</Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderColor: Colors.darkBlue,
    borderWidth: 2,
  },
  image: {
    borderRadius: 100,
    width: 95,
    height: 95,
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.WHITE,
    height: 27,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    bottom: 10,
    right: -8,
    borderColor: Colors.darkBlue,
    borderWidth: 2,
  },
  containerContent: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  iconName: {
    fontSize: TextSizes.smallText,
    color: Colors.darkBlue,
  },
  iconContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f1f4',
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  modelMainContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
  },
  personImage: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
  },
  imageIconContainer: {
    backgroundColor: Colors.darkBlue,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: '85%',
    left: '65%',
  },
});

export default ImagePicker;
