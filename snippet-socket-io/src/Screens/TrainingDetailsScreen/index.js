import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useTranslation} from 'react-i18next';
import {showErrorMessage, showSuccessMessage} from '../../utils/toastMessages';
import {useAuth, useLoader} from '../../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Screen} from '../../components';
import styles from './styles';
import {Colors} from '../../common';
import {t} from 'i18next';
import lang from '../../common/languages/lang';

const TrainingDetailsScreen = () => {
  const {i18n} = useTranslation();
  const {width} = useWindowDimensions();
  const [status, setStatus] = useState();
  const {setLoading} = useLoader();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [source, setSource] = useState({html: ''});
  const {Logout} = useAuth();

  const {params} = useRoute();

  useEffect(() => {
    // checkResults();
    getSingleTraining();
    checkResults();
  }, [isFocused]);

  const checkResults = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      `${ApiRoutes.employeeResult}/${params.id}`,
      (
        await config()
      ).headers,
    );
    if (!response.ok) {
      showErrorMessage(response?.data?.error);
      setLoading(false);
      if (response.status == 401) {
        Logout();
      }
      return;
    }

    setStatus(response.data.status);
    setLoading(false);
  };

  const getSingleTraining = async () => {
    setLoading(true);

    const response = await ApiCall.get(
      ApiRoutes.getSingleTraining(i18n.language) + params?.id,
      (
        await config()
      ).headers,
    );
    if (!response.ok) {
      setLoading(false);
      showErrorMessage(response?.data.error);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    setLoading(false);
    setData(response?.data.obj);
    setSource({html: response?.data?.obj?.training.detail});
  };
  const quizHandler = () => {
    if (status === 'Pass') {
      showSuccessMessage("You've already passed the quiz!");
      return;
    }
    navigation.navigate('Attempt Quiz Screen', {data: data, status: status});
  };
  return (
    <Screen>
      <View style={styles.backIcon}>
        <Ionicons
          name="chevron-back"
          size={35}
          color={Colors.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      {data ? (
        <ScrollView>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.headingText}>{data?.training.title}</Text>
              <RenderHTML contentWidth={width} source={source} />
            </View>
            <TouchableOpacity style={styles.signInBtn} onPress={quizHandler}>
              <Text style={styles.signInText}>{t(lang.AttemptQuiz)}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
    </Screen>
  );
};

export default TrainingDetailsScreen;
