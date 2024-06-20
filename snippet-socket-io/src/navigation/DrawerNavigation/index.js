import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {Colors} from '../../common';
import TrainingScreen from '../../Screens/TrainingScreen';
import CertificateScreen from '../../Screens/CertificateScreen';
import ChangePasswordScreen from '../../Screens/ChangePasswordScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import {useTranslation} from 'react-i18next';
import lang from '../../common/languages/lang.js';
import TrainingDetailsScreen from '../../Screens/TrainingDetailsScreen';
import AttemptQuizScreen from '../../Screens/AttemptQuizScreen';
import SafetyEvaluations from '../../Screens/SafetyEvaluations';
import VehicleInspection from '../../Screens/VehicleInspection';
import SafetyEvaluationDetails from '../SafetyEvaluationDetails';
import VehicleInspectionsDetails from '../VehicleInspectionsDetails';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  Feather.loadFont();
  const navigation = useNavigation();
  const [select, setSelected] = useState('Trainings');
  const {t, i18n} = useTranslation();

  const SelectedCard = ({onPress, icon, text, select}) => {
    return (
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: select ? Colors.blue : Colors.white,
        }}>
        <TouchableOpacity onPress={onPress} style={styles.card}>
          <Feather
            name={icon}
            color={select ? Colors.white : Colors.black}
            size={22}
          />
          <Text
            style={{
              ...styles.text,
              color: select ? Colors.white : Colors.black,
            }}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => (
        <SafeAreaView {...props}>
          <Image
            style={styles.img}
            source={require('../../Images/RoofingLogo.png')}
          />
          <SelectedCard
            onPress={() => {
              navigation.navigate('Trainings');
              setSelected('Trainings');
            }}
            text={t(lang.Trainings)}
            icon="book"
            select={select === 'Trainings'}
          />
          <SelectedCard
            onPress={() => {
              navigation.navigate('MyCertificates');
              setSelected('MyCertificates');
            }}
            text={t(lang.MyCertificate)}
            icon="book-open"
            select={select === 'MyCertificates'}
          />
          <SelectedCard
            onPress={() => {
              navigation.navigate('SafetyEvaluations');
              setSelected('SafetyEvaluations');
            }}
            text={t('SafetyEvaluations')}
            icon="shield"
            select={select === 'SafetyEvaluations'}
          />
          <SelectedCard
            onPress={() => {
              navigation.navigate('VehicleInspection');
              setSelected('VehicleInspection');
            }}
            text={t('VehicleInspection')}
            icon="truck"
            select={select === 'VehicleInspection'}
          />
        </SafeAreaView>
      )}>
      <Drawer.Screen name="Trainings" component={TrainingScreen} />
      <Drawer.Screen name="MyCertificates" component={CertificateScreen} />
      <Drawer.Screen name="SafetyEvaluations" component={SafetyEvaluations} />
      <Drawer.Screen name="VehicleInspection" component={VehicleInspection} />
      <Drawer.Screen
        name="SafetyEvaluationDetails"
        component={SafetyEvaluationDetails}
      />
      <Drawer.Screen
        name="VehicleInspectionsDetails"
        component={VehicleInspectionsDetails}
      />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="TrainingDetails" component={TrainingDetailsScreen} />
      <Drawer.Screen name="Attempt Quiz Screen" component={AttemptQuizScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
