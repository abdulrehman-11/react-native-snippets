import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, FlatList, Text, Linking} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import Header from '../../components/HeaderComponents/Header';
import PaginationComponent from '../../components/MyCertificateComponents/PaginationComponent';
import CustomTableRowsTraining from '../../components/TrainingComponents/CustomTableRowsTraining';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useAuth, useLoader, useNotify} from '../../hooks';
import {showErrorMessage} from '../../utils/toastMessages';
import {Screen} from '../../components';
import styles from './styles';
import lang from '../../common/languages/lang';
import DatePickerFilter from '../../components/TrainingComponents/DatePickerFilter';
import {
  notificationListener,
  requestUserPermission,
} from '../../utils/notificationServices';

const TrainingScreen = () => {
  PushNotification.configure({
    onRegister: function (token) {},
    onNotification: function (notification) {
      console.log({notification: notification?.data}), 'jabba';

      if (
        notification?.data?.id !== 'null' &&
        notification?.data?.screen == 'Inspection detail'
      ) {
        navigation.navigate('VehicleInspectionsDetails', {
          id: notification?.data?.id,
        });
      } else if (notification?.data?.screen === 'Safety evaluation detail') {
        navigation.navigate('SafetyEvaluationDetails', {
          id: notification?.data?.id,
        });
      } else if (notification.data?.id !== 'null') {
        navigation.navigate('TrainingDetails', {
          id: notification.data?.id,
        });
      } else {
        navigation.navigate('MyCertificates');
      }
    },
    onAction: function (notification) {},
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });

  const {i18n, t} = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigation = useNavigation();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [allTrainings, setAllTrainings] = useState({});
  const [allTableTrainings, setAllTableTrainings] = useState({});
  const {loading, setLoading} = useLoader();
  const {setNotification} = useNotify();
  const [dataRecieved, setDataRecieved] = useState(false);
  const {Logout} = useAuth();
  const isFocused = useIsFocused();
  const tableHead = [
    t(lang.Trainings),
    t(lang.Status),
    t(lang.ExpiryDate),
    t(lang.Result),
    t(lang.Actions),
  ];
  const widthArr = [200, 140, 140, 140, 140];

  useEffect(() => {
    GetTrainings();
  }, [i18n.language, currentPage, endDate, startDate, isFocused]);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getNotifications();
    handleUniversalUrl();
    getItem();
  }, []);
  const getItem = async () => {
    const token1 = await AsyncStorage.getItem('fcmToken');
  };

  const handleUniversalUrl = async () => {
    const sentUrl = await Linking.getInitialURL();
    if (!sentUrl) {
      return;
    }
    const separateURL = sentUrl?.split('/');
    if (separateURL?.[4] === 'training-details') {
      navigation.navigate('TrainingDetails', {id: separateURL[5]});
    } else if (separateURL?.[3] === 'vehicle-inspections') {
      navigation.navigate('VehicleInspectionsDetails', {id: separateURL[5]});
    } else if (separateURL?.[3] === 'my-certificates') {
      navigation.navigate('MyCertificates');
    }
  };
  const getNotifications = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      ApiRoutes.getNotifications,
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
    setNotification(response?.data.notifications);
    setLoading(false);
  };

  const GetTrainings = async () => {
    setLoading(true);
    setDataRecieved(false);
    const start = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');
    const page = currentPage;
    const response = await ApiCall.get(
      startDate === null && endDate === null
        ? `${ApiRoutes.getTrainings(i18n.language, page)}`
        : `${ApiRoutes.getTrainingsWithDate(i18n.language, start, end, page)}`,
      (
        await config()
      ).headers,
    );
    setLoading(false);
    if (!response.ok) {
      showErrorMessage(response?.data?.error);
      if (response.status == 401) {
        Logout();
      }
      // dataRecieved(true);
      return;
    }
    setTotalPages(response.data.totalpages);
    mapTrainingsForTable(response.data.trainings);
    setAllTrainings({...allTrainings, [currentPage]: response.data.trainings});
    setDataRecieved(true);
  };
  const mapTrainingsForTable = trainings => {
    let newTrainings = [];
    trainings.map(training => {
      const {title, status, result, expiryDate} = training;
      newTrainings = [
        ...newTrainings,
        [title, status, expiryDate, result, 'View'],
      ];
    });
    let allPreviousTrainings = {
      ...allTableTrainings,
      [currentPage]: newTrainings,
    };
    setAllTableTrainings(allPreviousTrainings);
  };

  const returnRow = ({item, index}) => {
    return (
      <CustomTableRowsTraining
        key={index}
        onPress={trainingDetailsTapHandler}
        data={item}
        widthArr={widthArr}
        index={index}
      />
    );
  };
  const trainingDetailsTapHandler = index => {
    navigation.navigate('TrainingDetails', {
      id: allTrainings[currentPage][index]._id,
    });
  };

  const filterDatesSelected = value => {
    setCurrentPage(1);
    setStartDate(value.firstDate);
    setEndDate(value.secondDate);
  };

  const clearFilterDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Screen>
      <Header />
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>{t(lang.Filter)}</Text>
        <DatePickerFilter
          onDateSelected={filterDatesSelected}
          clearFilterDates={clearFilterDates}
          startDate={startDate}
          endDate={endDate}
        />
      </View>
      <ScrollView>
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
            {allTableTrainings[currentPage] ? (
              <ScrollView style={styles.dataWrapper} horizontal>
                <Table style={styles.table}>
                  <FlatList
                    scrollEnabled={false}
                    data={allTableTrainings[currentPage]}
                    renderItem={returnRow}
                  />
                </Table>
              </ScrollView>
            ) : null}
          </View>
        </ScrollView>
        {dataRecieved && allTableTrainings[currentPage]?.length === 0 ? (
          <Text style={styles.noDataText}>{t(lang.NoData)}</Text>
        ) : null}
      </ScrollView>

      {totalPages > 0 && !loading ? (
        <View style={styles.bottomBar}>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </View>
      ) : null}
      <View style={{height: 30}} />
    </Screen>
  );
};

export default TrainingScreen;
