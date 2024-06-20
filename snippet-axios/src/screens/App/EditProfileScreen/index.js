import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';

import {
  PhoneInput,
  Screen,
  ImagePicker,
  ActivityIndicator,
} from '../../../components';
import {useUser} from '../../../hooks';
import {Button} from '../../../components/Buttons';
import {AppHeader} from '../../../components/Headers';
import {handleUpdateProfile} from './helpers';
import {baseUrl} from '../../../config';
import TextField from '../../../components/TextInputComponent';
import styles from './styles';

const EditProfileScreen = ({navigation}) => {
  const {user, saveUser} = useUser();
  const [name, setName] = useState('');
  const [newImage, setNewImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [callingCode, setCallingCode] = useState('+1');
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setUsername(user?.user_name);
    setPhoneNumber(user?.phone_number.split(user?.calling_code)[1]);
    setCallingCode(user?.calling_code);
    setCountryCode(user?.country_code);
    setPreviewImage(user?.image);
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen>
        <AppHeader title="Edit Profile" />
        <ScrollView>
          <View style={styles.imageContainer}>
            <ImagePicker
              image={
                newImage ? newImage : previewImage && baseUrl + previewImage
              }
              setImage={setNewImage}
            />
          </View>
          <View style={styles.formContainer}>
            <TextField label={'Name*'} value={name} onChangeText={setName} />
            <TextField
              label="Username(Optional)"
              value={username}
              onChangeText={setUsername}
            />
            <PhoneInput
              value={phoneNumber}
              callingCode={callingCode}
              countryCode={countryCode === 'United States' ? 'US' : countryCode}
              setCallingCode={setCallingCode}
              editable={false}
              setCountryCode={setCountryCode}
              onChangeText={setPhoneNumber}
            />
            <TextField
              label="Email Address*"
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
            <TextField
              label="New Password (Optional)"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>
          <Button
            title="Save"
            gradient
            style={styles.btnContainer}
            onPress={async () => {
              setLoading(true);
              const user = await handleUpdateProfile(
                newImage,
                name,
                email,
                username,
                phoneNumber,
                callingCode,
                countryCode,
                password,
                null,
              );
              setLoading(false);
              if (user) {
                saveUser(user);
                navigation.goBack();
              }
            }}
          />
        </ScrollView>
      </Screen>
    </>
  );
};

export default EditProfileScreen;
