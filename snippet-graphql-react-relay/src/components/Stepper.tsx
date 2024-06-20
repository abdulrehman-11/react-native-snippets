import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '.';
import {Colors} from '../common';
import {useTranslation} from 'react-i18next';

interface StepperProps {
  data: string[];
  selectedItem: number;
  onSelect: (value: number) => void;
}

const Stepper: FC<StepperProps> = ({data, selectedItem, onSelect}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.innerContainer}>
      {data.map((i: string, index: number) => (
        <TouchableOpacity
          style={{
            paddingBottom: 5,
            borderBottomWidth: index === selectedItem ? 1 : 0,
            borderBottomColor:
              index === selectedItem ? Colors.primary : Colors.grey,
          }}
          key={index}
          onPress={() => onSelect(index)}>
          <Text
            style={{
              ...styles.headingText,
              color: index === selectedItem ? Colors.primary : Colors.grey,
            }}>
            {t(i)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headingText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    marginHorizontal: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    justifyContent: 'space-evenly',
  },
});

export default Stepper;
