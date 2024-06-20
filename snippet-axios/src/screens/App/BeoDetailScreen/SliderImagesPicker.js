import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal as LargeModal,
  Platform,
} from 'react-native';
import ImagePickerCrop from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';

import {Colors, Icons, TextSizes} from '../../../common';
import {Text} from '../../../components';
import {Button} from '../../../components/Buttons';
import {useUser} from '../../../hooks';

const SliderImagesPicker = ({images, setImage, onDelete}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ImageModal, setImageModal] = useState(false);
  const {user} = useUser();

  const selectImage = async () => {
    try {
      const NewImages = await ImagePickerCrop.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        multiple: true,
        compressImageQuality: 0.5,
        cropping: true,
      });

      const newImages = NewImages.map(item => {
        return {image: `data:${item.mime};base64,${item.data}`};
      });
      setImage(newImages);
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

      setImage([{image: `data:${image.mime};base64,${image.data}`}]);
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

  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setImageModal(true)}
        style={styles.slide}>
        {item.id !== 0 && item.user_id === user?.id && (
          <TouchableOpacity
            onPress={() => onDelete(item)}
            style={{zIndex: 100}}>
            <Icons.Entypo
              name="squared-cross"
              size={40}
              color={Colors.red}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        )}
        <Image
          source={{uri: item.image}}
          style={styles.personImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  if (!images.length) {
    return (
      <>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.imageSelectorContainer}>
          <View>
            <Icons.Feather name="image" size={30} color={Colors.darkBlue} />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addIcon}>
            <Icons.Ionicons name="add" size={30} color={Colors.WHITE} />
          </TouchableOpacity>
        </TouchableOpacity>
        <Modal isVisible={modalVisible}>{ContentModal()}</Modal>
      </>
    );
  }

  return (
    <>
      <View>
        <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          removeClippedSubviews={false}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.imageIconContainer}>
          <Icons.Feather name="camera" size={25} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
      <Modal isVisible={modalVisible}>{ContentModal()}</Modal>
      <LargeModal supp visible={ImageModal} transparent={true}>
        <TouchableOpacity
          onPress={() => setImageModal(false)}
          style={styles.viewPdfContainer}>
          <Icons.Entypo name="circle-with-cross" size={40} color={Colors.red} />
        </TouchableOpacity>
        <ImageViewer
          imageUrls={images.map(item => {
            return {url: item.image};
          })}
        />
      </LargeModal>
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
    borderRadius: 20,
  },
  imageIconContainer: {
    backgroundColor: Colors.darkBlue,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: '82%',
    left: '75%',
  },
  deleteIcon: {
    position: 'absolute',
    left: '75%',
    zIndex: 100,
  },
  viewPdfContainer: {
    position: Platform.OS === 'ios' ? 'relative' : 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
    marginRight: Platform.OS === 'ios' ? '5%' : '2%',
    top: '6%',
  },
  addIcon: {
    position: 'absolute',
    backgroundColor: Colors.darkBlue,
    right: -15,
    borderRadius: 25,
    bottom: -10,
  },
  imageSelectorContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderColor: Colors.darkBlue,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },
});

export default SliderImagesPicker;
