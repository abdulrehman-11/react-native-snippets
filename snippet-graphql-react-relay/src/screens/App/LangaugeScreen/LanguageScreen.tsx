import React, {FC} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

import {AppHeader, Screen, Text} from '../../../components';
import {useLanguage} from '../../../hooks';
import LangKeys from '../../../i18n/translations/LangKeys';
import {Languages} from '../../../common/DummyData';
import {Colors} from '../../../common';

const LanguageScreen: FC = () => {
  const {t} = useTranslation();
  const {language, saveLanguage} = useLanguage();

  return (
    <Screen>
      <AppHeader showBack={true} title={t(LangKeys.changeLanguage)} />
      {Languages.map(lang => {
        return (
          <Pressable onPress={() => saveLanguage(lang.id)}>
            <View
              style={{
                ...styles.container,
                borderColor:
                  lang.id === language ? Colors.primary : Colors.black,
              }}>
              <Text>{lang.title}</Text>
            </View>
          </Pressable>
        );
      })}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default LanguageScreen;
