import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import QuizQuestion from '../../components/QuizComponents/QuizQuestion';
import {showErrorMessage, showSuccessMessage} from '../../utils/toastMessages';
import {ApiCall, config} from '../../apiConfiguration';
import apiRoutes from '../../apiConfiguration/apiRoutes';
import {useAuth, useLoader} from '../../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Screen} from '../../components';
import styles from './styles';
import {Colors} from '../../common';
import ModalResult from '../../components/ModalResult';

const AttemptQuizScreen = () => {
  Ionicons.loadFont();
  const {params} = useRoute();
  const [training, setTraining] = useState();
  const [quizAnswers, setQuizAnswers] = useState({});
  const {setLoading} = useLoader();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [result, setResult] = useState();
  const {Logout} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const showQuestions = ({item, index}) => {
    return (
      <QuizQuestion
        question={item}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
        keyIndex={index}
      />
    );
  };
  useEffect(() => {
    setTraining(params.data);
    return () => {
      setTraining(null);
      setQuizAnswers({});
    };
  }, [isFocused]);

  const quizHandler = async () => {
    if (training?.training?.quiz.length !== Object.keys(quizAnswers).length) {
      showErrorMessage('Please select all answers');
      return;
    }
    setLoading(true);

    let obtainedMarks = checkAnswers(quizAnswers, training?.training?.quiz);
    const obj = {
      training: training._id,
      totalMarks: training?.training.quiz.length,
      obtainedMarks: obtainedMarks,
    };

    const response =
      params?.status === 'Fail'
        ? await ApiCall.put(
            apiRoutes.updateResult,
            obj,
            (
              await config()
            ).headers,
          )
        : await ApiCall.post(
            apiRoutes.getResult,
            obj,
            (
              await config()
            ).headers,
          );

    setLoading(false);
    if (!response.ok) {
      showErrorMessage(response?.data.error);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    setResult(response?.data?.result);
    setModalVisible(true);
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
      <ModalResult
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        result={result}
      />
      <View style={styles.quizContainer}>
        <FlatList data={training?.training.quiz} renderItem={showQuestions} />

        {moment(new Date()).isBetween(
          training?.startDate,
          training?.endDate,
        ) ? (
          <TouchableOpacity style={styles.submitBtn} onPress={quizHandler}>
            <Text style={styles.submitBtnText}>Submit Quiz</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Screen>
  );
};

export default AttemptQuizScreen;

const checkAnswers = (quizAnswers, questions) => {
  let obtainedMarks = 0;

  questions.map((question, index) => {
    if (question.answer === quizAnswers[index]) {
      obtainedMarks = obtainedMarks + 1;
    }
  });
  return obtainedMarks;
};
