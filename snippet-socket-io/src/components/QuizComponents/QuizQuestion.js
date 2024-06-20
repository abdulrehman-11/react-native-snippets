import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../common';

const QuizQuestion = ({question, quizAnswers, setQuizAnswers, keyIndex}) => {
  const selectAnswer = item => {
    setQuizAnswers({...quizAnswers, [keyIndex]: item});
  };

  const showAnswerOptions = ({item, index}) => {
    if (!item) {
      return;
    }
    return (
      <TouchableOpacity
        style={styles.answerOption}
        onPress={() => selectAnswer(item)}>
        <View
          style={{
            ...styles.optionCheck,
            backgroundColor:
              item === quizAnswers[keyIndex] ? Colors.radioIcon : Colors.white,
          }}
        />
        <Text style={styles.answerText}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.question}</Text>
      <FlatList data={question?.options} renderItem={showAnswerOptions} />
    </View>
  );
};

export default QuizQuestion;

const styles = StyleSheet.create({
  questionContainer: {
    margin: 8,
    padding: 8,
  },
  answerOption: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  optionCheck: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 6,
    borderColor: Colors.fontColorTrainingDetailsHeading,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.fontColorTrainingDetailsHeading,
    fontWeight: '500',
  },
  answerText: {
    fontWeight: '500',
    color: Colors.fontColorTrainingDetailsHeading,
  },
});
