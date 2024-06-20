import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Flag from 'react-native-flags';
import {Colors} from '../../common';
import {useTranslation} from 'react-i18next';
import i18n, {changeLanguage} from 'i18next';
import lang from '../../common/languages/lang';

const FlagCustom = ({toggle, setToggle}) => {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const selectLanguages = [
    {
      id: 1,
      value: 'en-US',
      icon: 'US',
      label: 'English',
    },
    {
      id: 2,
      value: 'es',
      icon: 'ES',
      label: 'Spanish',
    },
  ];
  const toggleHandler = () => {
    if (toggle === 'language') {
      setToggle(null);
      return;
    }
    setToggle('language');
  };
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={toggleHandler}>
        <Flag code={i18n.language.includes('US') ? 'US' : 'ES'} size={32} />
      </TouchableOpacity>
      {toggle === 'language' ? (
        <View style={styles.openView}>
          {selectLanguages.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.languageContainer}
                onPress={() => {
                  setLanguage(item.value);
                  changeLanguage(item.value);
                  setToggle('none');
                }}>
                <Flag code={item.icon} size={32} />
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default FlagCustom;

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 20,
  },
  openView: {
    height: 90,
    width: 160,
    position: 'absolute',
    top: 40,
    left: -20,
    backgroundColor: Colors.white,
    padding: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 3,
  },
  text: {
    marginLeft: 10,
    color: Colors.black,
  },
});
