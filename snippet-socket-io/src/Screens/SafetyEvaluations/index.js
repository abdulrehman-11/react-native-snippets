import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../../components';
import Header from '../../components/HeaderComponents/Header';
import {showErrorMessage} from '../../utils/toastMessages';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useLoader} from '../../hooks';
import {Row, Table} from 'react-native-table-component';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import moment from 'moment';
import SafetyEvaluationRow from '../../components/SafetyEvaluationsComponents/SafetyEvaluationRow';
import {useNavigation} from '@react-navigation/native';

const SafetyEvaluations = () => {
  const {setLoading} = useLoader();
  const [safetyEvaluations, setSafetyEvaluations] = useState([]);
  const [safetyEvaluationsScratch, setSafetyEvaluationsScratch] = useState([]);
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const getEvaluations = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      ApiRoutes.getSafetyEvaluations,
      (
        await config()
      ).headers,
    );
    if (!response.ok) {
      showErrorMessage(response?.data.error);

      setLoading(false);
      if (response.status == 401) {
        Logout();
      }
      return;
    }
    setSafetyEvaluationsScratch(response?.data?.evaluations);
    formatData(response?.data?.evaluations);
    setLoading(false);
  };
  useEffect(() => {
    getEvaluations();
  }, [i18n.language]);

  function getPercentageString(number) {
    const percentage = (number / 15) * 100;

    if (percentage <= 60) {
      return t('Unsatisfactory');
    } else if (percentage <= 66) {
      return t('BelowStandard');
    } else if (percentage <= 73) {
      return t('MinimalStandard');
    } else if (percentage < 90) {
      return t('AboveStandard');
    } else {
      return t('Superior');
    }
  }
  const tableHead = [
    t('Date'),
    t('EvaluatedBy'),
    t('Score'),
    t('PerformanceLevels'),
    t('Actions'),
  ];
  const widthArr = [140, 140, 140, 140, 140];

  const returnRow = (item, index, onPress) => {
    return (
      <SafetyEvaluationRow
        data={item}
        widthArr={widthArr}
        index={index}
        onPress={onPress}
      />
    );
  };
  const formatData = dataApi => {
    let baseData = dataApi;
    let formattedEvaluations = baseData.map(evaluation => {
      return [
        moment(evaluation?.date).format('YYYY-MM-DD'),
        evaluation?.evaluatedBy,
        evaluation?.score,
        getPercentageString(evaluation?.score),
        safetyEvaluationsScratch,
      ];
    });
    setSafetyEvaluations(formattedEvaluations);
  };
  const safetyEvaluationDetailsTapHandler = index => {
    navigation.navigate('SafetyEvaluationDetails', {
      id: safetyEvaluationsScratch[index]._id,
    });
  };

  return (
    <Screen>
      <Header />
      <ScrollView horizontal={true}>
        <View>
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          {safetyEvaluations?.length > 0 ? (
            <ScrollView style={styles.dataWrapper} horizontal>
              <Table
                style={{
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 4.11,
                  elevation: 1,
                }}>
                <FlatList
                  data={safetyEvaluations}
                  renderItem={({item, index}) =>
                    returnRow(item, index, safetyEvaluationDetailsTapHandler)
                  }
                />
              </Table>
            </ScrollView>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SafetyEvaluations;
