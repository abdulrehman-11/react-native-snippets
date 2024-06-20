import {View, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../common';
import {useTranslation} from 'react-i18next';

const RadioButton = ({options, selectedOption, onSelect, styles, disable}) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles}>
      {options.map(option => (
        <TouchableOpacity
          disabled={disable}
          key={option}
          onPress={() => onSelect(option)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor:
                disable && selectedOption === option
                  ? 'gray'
                  : selectedOption === option
                  ? Colors.blue
                  : Colors.gray,
              backgroundColor:
                disable && selectedOption === option
                  ? 'gray'
                  : selectedOption === option
                  ? Colors.blue
                  : Colors.white,
              marginRight: 10,
            }}></View>
          <Text style={{color: Colors.black}}>{t(option)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RadioButton;
