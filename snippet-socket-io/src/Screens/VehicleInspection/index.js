import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../../components';
import Header from '../../components/HeaderComponents/Header';
import RadioButton from '../../components/RadioButton';
import {useTranslation} from 'react-i18next';
import lang from '../../common/languages/lang.js';
import {Row, Table} from 'react-native-table-component';
import {useLoader} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {showErrorMessage} from '../../utils/toastMessages';
import moment from 'moment';
import styles from './styles';

import VehicleInspectionComponents from '../../components/VehicleInspectionComponents';

const VehicleInspection = () => {
  const {setLoading} = useLoader();
  const [vehicleInspections, setVehicleInspections] = useState([]);
  const [vehicleInspectionsData, setVehicleInspectionsData] = useState([]);
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();

  const tableHead = [t('VehicleNumber'), t('AssignedOn'), t('Actions')];
  const widthArr = [140, 140, 200];

  const getVehicleInspections = async () => {
    setLoading(true);
    const response = await ApiCall.get(
      ApiRoutes.getInspections,
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
    setVehicleInspectionsData(response?.data?.inspections);
    formatData(response?.data?.inspections);
    setLoading(false);
  };
  const formatData = dataApi => {
    let baseData = dataApi;
    let formattedInspections = baseData.map(inspection => {
      return [
        inspection?.vehicle.vehicleNumber,
        moment(inspection?.createdAt).format('YYYY-MM-DD'),
        inspection?.status,
      ];
    });
    setVehicleInspections(formattedInspections);
  };
  const returnRow = (item, index, onPress) => {
    return (
      <VehicleInspectionComponents
        data={item}
        widthArr={widthArr}
        index={index}
        onPress={onPress}
      />
    );
  };

  const inspectionsDetailsTapHandler = index => {
    navigation.navigate('VehicleInspectionsDetails', {
      id: vehicleInspectionsData[index]._id,
    });
  };
  useEffect(() => {
    getVehicleInspections();
  }, [i18n.language]);

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
          {vehicleInspections?.length > 0 ? (
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
                  data={vehicleInspections}
                  renderItem={({item, index}) =>
                    returnRow(item, index, inspectionsDetailsTapHandler)
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

export default VehicleInspection;
