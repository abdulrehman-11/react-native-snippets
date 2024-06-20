import React, { useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { LogoutModal, Text } from '../../components';
import { Colors, Icons, Routes } from '../../common';
import useAuth from '../../hooks/useAuth';
import LangKeys from '../../i18n/translations/LangKeys';

const DrawerContent: React.FC = (props) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image
          source={require('../../assets/images/rightCircles.png')}
          style={styles.rightCircle}
        />
        <Image source={require('../../assets/images/leftCircles.png')} style={styles.leftCircle} />
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={{ uri: user?.user_avatar }} style={styles.img} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.heading}>{user?.user_name}</Text>
              <Text style={styles.text}>{user?.user_email}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: '73%' }}>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate(Routes.LanguageScreen)}
            style={styles.iconContainer}
          >
            <View style={{ marginRight: 10 }}>
              <Icons.Fontisto name='language' size={24} color={Colors.white} />
            </View>
            <Text style={styles.textIcon}>{t(LangKeys.changeLanguage)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate(Routes.ProfileStack)}
            style={styles.iconContainer}
          >
            <View style={{ marginRight: 10 }}>
              <Icons.AntDesign name='user' size={24} color={Colors.white} />
            </View>
            <Text style={styles.textIcon}>{t(LangKeys.profile)}</Text>
          </TouchableOpacity>
        </View>
        <LogoutModal
          title={t(LangKeys.logout)}
          description={t(LangKeys.areYouSureLogout)}
          isVisible={showLogoutModal}
          onCancel={() => setShowLogoutModal(false)}
          onAccept={logout}
        />
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setShowLogoutModal(true)}>
          <View style={{ marginRight: 10 }}>
            <Image source={require('../../assets/images/PowerDrawer.png')} style={styles.icon} />
          </View>
          <Text style={styles.textIcon}>{t(LangKeys.logout)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { height: '100%', backgroundColor: Colors.primary },
  heading: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: Colors.white,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.white,
    width: '85%',
  },
  container: {
    paddingTop: 30,
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    paddingBottom: 15,
  },
  img: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textIcon: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.white,
  },
  rightCircle: {
    width: 200,
    height: 300,
    position: 'absolute',
    objectFit: 'cover',
    right: 0,
    top: 450,
  },
  leftCircle: {
    width: 250,
    height: 340,
    position: 'absolute',
    objectFit: 'cover',
    left: -50,
  },
  divider: {
    borderTopColor: Colors.white,
    borderTopWidth: 1,
    paddingBottom: 10,
    marginHorizontal: 20,
  },
});

export default DrawerContent;
