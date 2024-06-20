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
import styles from './styles';
import {showErrorMessage, showSuccessMessage} from '../../utils/toastMessages';
import {ApiCall, ApiRoutes, config} from '../../apiConfiguration';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useLoader} from '../../hooks';

const initialData = {
  frontDriverSidePanel: null,
  hood: null,
  frontBumper: null,
  frontPassengerSidePanel: null,
  frontPassengerSideDoor: null,
  rearPassengerSideDoor: null,
  rearPassengerSidePanel: null,
  rearBumper: null,
  rearDriverSidePanel: null,
  rearDriverSideDoor: null,
  frontDriverSideDoor: null,
  tires: null,
  brakes: null,
  engineLights: null,
};

const VehicleInspectionsDetails = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {setLoading} = useLoader();
  const [selectedOption, setSelectedOption] = useState(initialData);
  const [disable, setDisable] = useState(false);
  const isFocused = useIsFocused();
  const [inspectionId, setInspectionId] = useState();

  const {t, i18n} = useTranslation();

  const handleOptionSelect = (option, name) => {
    setSelectedOption({...selectedOption, [name]: option});
  };
  const options = ['Yes', 'No'];

  const submitHandler = async () => {
    if (!validateData(selectedOption)) {
      return showErrorMessage('Please select all options');
    }
    const formattedData = convertYesNoToBoolean(selectedOption);
    setLoading(true);
    const response = await ApiCall.post(
      ApiRoutes.addEmployeeInspection,
      {inspectionId: params.id, inspectionData: formattedData},
      (
        await config()
      ).headers,
    );
    setLoading(false);
    if (!response.ok) {
      return showErrorMessage('Failed Data');
    }
    showSuccessMessage(response?.data?.message);
    navigation.goBack();
  };

  const getInspectionDetail = async () => {
    const response = await ApiCall.get(
      `${ApiRoutes.getInspectionDetails}/${inspectionId}`,
      (
        await config()
      ).headers,
    );
    if (response?.data?.inspection) {
      const formatToYesOrNo = convertBooleanToYesNo(response.data.inspection);

      setSelectedOption(formatToYesOrNo);
      setDisable(true);
    }
  };

  useEffect(() => {
    setInspectionId(params?.id);
    getInspectionDetail();
    return () => {
      setSelectedOption(initialData);
      setDisable(false);
      setInspectionId();
    };
  }, [isFocused, params.id]);

  const SingleRadioButtonInspection = ({
    options,
    selectedOption,
    onSelect,
    text,
    disable,
  }) => {
    return (
      <View style={styles.containerCol}>
        <Text style={styles.maintitle}>{text}</Text>
        <View style={styles.insideContainerCol}>
          <View>
            <RadioButton
              disable={disable}
              styles={{flexDirection: 'row', justifyContent: 'space-around'}}
              options={options}
              selectedOption={selectedOption}
              onSelect={onSelect}
            />
          </View>
        </View>
      </View>
    );
  };

  const DoubleRadioButtonInspection = ({
    nameOne,
    nameTwo,
    options,
    selectedOptionOne,
    selectedOptionTwo,
    onSelectOne,
    onSelectTwo,
    text,
    disable,
  }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.maintitle}>{text}</Text>
        <View style={styles.insideContainer}>
          <View>
            <Text style={styles.title}>{nameOne}</Text>
            <RadioButton
              options={options}
              selectedOption={selectedOptionOne}
              onSelect={onSelectOne}
              disable={disable}
            />
          </View>
          <View>
            <Text style={styles.title}>{nameTwo}</Text>
            <RadioButton
              options={options}
              selectedOption={selectedOptionTwo}
              onSelect={onSelectTwo}
              disable={disable}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen>
      <Header />
      <ScrollView
        style={styles.cardContainer}
        contentContainerStyle={{justifyContent: 'space-between'}}>
        <Text style={styles.heading}>{t('PleaseCheck')}</Text>
        <DoubleRadioButtonInspection
          text={t('FrontPanel')}
          options={options}
          nameOne={t('PassengerSide')}
          selectedOptionOne={selectedOption.frontPassengerSidePanel}
          onSelectOne={option =>
            handleOptionSelect(option, 'frontPassengerSidePanel')
          }
          nameTwo={t('DriverSide')}
          selectedOptionTwo={selectedOption.frontDriverSidePanel}
          onSelectTwo={option =>
            handleOptionSelect(option, 'frontDriverSidePanel')
          }
          disable={disable}
        />
        <DoubleRadioButtonInspection
          text={t('FrontDoor')}
          options={options}
          nameOne={t('PassengerSide')}
          selectedOptionOne={selectedOption.frontPassengerSideDoor}
          onSelectOne={option =>
            handleOptionSelect(option, 'frontPassengerSideDoor')
          }
          nameTwo={t('DriverSide')}
          selectedOptionTwo={selectedOption.frontDriverSideDoor}
          onSelectTwo={option =>
            handleOptionSelect(option, 'frontDriverSideDoor')
          }
          disable={disable}
        />
        <DoubleRadioButtonInspection
          text={t('RearPanel')}
          options={options}
          nameOne={t('PassengerSide')}
          selectedOptionOne={selectedOption.rearPassengerSidePanel}
          onSelectOne={option =>
            handleOptionSelect(option, 'rearPassengerSidePanel')
          }
          nameTwo={t('DriverSide')}
          selectedOptionTwo={selectedOption.rearDriverSidePanel}
          onSelectTwo={option =>
            handleOptionSelect(option, 'rearDriverSidePanel')
          }
          disable={disable}
        />
        <DoubleRadioButtonInspection
          text={t('RearDoor')}
          options={options}
          nameOne={t('PassengerSide')}
          selectedOptionOne={selectedOption.rearPassengerSideDoor}
          onSelectOne={option =>
            handleOptionSelect(option, 'rearPassengerSideDoor')
          }
          nameTwo={t('DriverSide')}
          selectedOptionTwo={selectedOption.rearDriverSideDoor}
          onSelectTwo={option =>
            handleOptionSelect(option, 'rearDriverSideDoor')
          }
          disable={disable}
        />
        <SingleRadioButtonInspection
          text={t(lang.Hood)}
          options={options}
          selectedOption={selectedOption.hood}
          onSelect={option => handleOptionSelect(option, 'hood')}
          disable={disable}
        />

        <SingleRadioButtonInspection
          text={t('FrontBumper')}
          options={options}
          selectedOption={selectedOption.frontBumper}
          onSelect={option => handleOptionSelect(option, 'frontBumper')}
          disable={disable}
        />
        <SingleRadioButtonInspection
          text={t('RearBumper')}
          options={options}
          selectedOption={selectedOption.rearBumper}
          onSelect={option => handleOptionSelect(option, 'rearBumper')}
          disable={disable}
        />
        <SingleRadioButtonInspection
          text={t(lang.Tires)}
          options={options}
          selectedOption={selectedOption.tires}
          onSelect={option => handleOptionSelect(option, 'tires')}
          disable={disable}
        />
        <SingleRadioButtonInspection
          text={t(lang.Brakes)}
          options={options}
          selectedOption={selectedOption.brakes}
          onSelect={option => handleOptionSelect(option, 'brakes')}
          disable={disable}
        />
        <SingleRadioButtonInspection
          text={t('EngineLights')}
          options={options}
          selectedOption={selectedOption.engineLights}
          onSelect={option => handleOptionSelect(option, 'engineLights')}
          disable={disable}
        />

        {!disable ? (
          <TouchableOpacity
            style={styles.addInspectionContainer}
            onPress={submitHandler}>
            <View style={styles.addInspection}>
              <Text style={styles.addInspectionText}>{t('AddInspection')}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </Screen>
  );
};

export default VehicleInspectionsDetails;

function validateData(data) {
  for (const property in data) {
    if (data[property] === null) {
      return false;
    }
  }
  return true;
}

function convertYesNoToBoolean(data) {
  const convertedData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      // Convert "Yes" to true and "No" to false
      const convertedValue = value === 'Yes' ? true : false;

      convertedData[key] = convertedValue;
    }
  }

  return convertedData;
}

function convertBooleanToYesNo(data) {
  const convertedData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      // Convert true to "Yes" and false to "No"
      const convertedValue = value ? 'Yes' : 'No';

      convertedData[key] = convertedValue;
    }
  }

  return convertedData;
}
