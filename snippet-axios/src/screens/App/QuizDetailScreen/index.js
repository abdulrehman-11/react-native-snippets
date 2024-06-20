import React, {useState} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';

import {
  Screen,
  Text,
  TrackPlayer,
  VideoPlayer,
  YoutubeVideoPlayer,
} from '../../../components';
import styles from './styles';
import {Colors} from '../../../common';
import {PdfModal, ResultModal} from '../../../components/Modals';
import {Button} from '../../../components/Buttons';
import {AppHeader} from '../../../components/Headers';
import {showWarningMessage} from '../../../components/Toastify';

const QuizDetailScreen = ({route}) => {
  const {name, questions, quizResult} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    quizResult.question_no,
  );
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState(quizResult.points);
  const [viewPdf, setViewPDF] = useState(false);

  const QuizCount = () => {
    return (
      <View style={styles.quizCountContainer}>
        <Text>
          {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>
    );
  };

  const PointsCount = () => {
    return (
      <View style={styles.pointsCountContainer}>
        <Image source={require('../../../../assets/Images/ic_dollar.png')} />
        <Text>+{points}</Text>
      </View>
    );
  };

  const renderSecondHeader = () => {
    return (
      <View style={styles.container}>
        <QuizCount />
        <PointsCount />
      </View>
    );
  };

  const Option = ({option, selected, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      style={selected ? styles.selectedContainer : styles.optionContainer}>
      <Text style={selected ? {color: Colors.WHITE} : {}}>{option}</Text>
    </TouchableOpacity>
  );

  const renderFile = (type, link) => {
    if (!link) {
      return;
    }

    console.log({link: link.split('https://vimeo.com/')[1]});

    return (
      <>
        {type === 'audio' ? (
          <TrackPlayer link={link} />
        ) : type === 'video' ? (
          <VideoPlayer url={link} />
        ) : type === 'pdf' ? (
          <RenderPdf link={link} />
        ) : type === 'image' ? (
          <View style={styles.mainImage}>
            <Image
              source={{uri: link}}
              style={{
                width: '100%',
                height: '80%',
              }}
              resizeMode="contain"
            />
          </View>
        ) : type === 'youtube' ? (
          <YoutubeVideoPlayer VideoId={link.split('https://youtu.be/')[1]} />
        ) : type === 'vimeo' ? (
          <YoutubeVideoPlayer
            type="vimeo"
            VideoId={link.split('https://vimeo.com/')[1]}
          />
        ) : null}
      </>
    );
  };

  const RenderPdf = ({link}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setViewPDF(!viewPdf)}
          style={styles.viewPdfContainer}>
          <Text>View</Text>
        </TouchableOpacity>

        <PdfModal visible={viewPdf} setVisible={setViewPDF} link={link} />
      </>
    );
  };

  return (
    <Screen>
      <AppHeader title={name} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSecondHeader()}

        {renderFile(
          questions[currentQuestionIndex]?.file_type,
          questions[currentQuestionIndex]?.file_link,
        )}

        <Text style={styles.question}>
          {questions[currentQuestionIndex]?.description}
        </Text>
        {[
          questions[currentQuestionIndex]?.option1,
          questions[currentQuestionIndex]?.option2,
          questions[currentQuestionIndex]?.option3,
          questions[currentQuestionIndex]?.option4,
        ].map((option, index) => {
          if (option) {
            return (
              <Option
                key={index}
                option={option}
                selected={option === selectedAnswer}
                onPress={() => setSelectedAnswer(option)}
              />
            );
          }
        })}

        <Button
          title="Next"
          gradient
          onPress={() => {
            if (!selectedAnswer) {
              return showWarningMessage('Please select an option');
            }
            setModalVisible(true);
          }}
        />
      </ScrollView>
      <ResultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        answer={questions[currentQuestionIndex]?.answer}
        correct={selectedAnswer === questions[currentQuestionIndex]?.answer}
        points={points}
        setPoints={setPoints}
        questionIndex={currentQuestionIndex}
        setQuestionIndex={setCurrentQuestionIndex}
        totalQuestions={questions.length}
        setSelectedAnswer={setSelectedAnswer}
        quizName={name}
        quizResult={quizResult}
      />
    </Screen>
  );
};

export default QuizDetailScreen;
