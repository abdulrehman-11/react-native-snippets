import React, {FC} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import {Text} from '.';
import {Colors, Icons} from '../common';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
}

const RadioButton: FC<Props> = ({value, onChange, title}) => {
  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={() => onChange(!value)}
        style={{
          ...styles.container,
          backgroundColor: value ? Colors.green : Colors.white,
          borderColor: !value ? Colors.grey : Colors.white,
        }}>
        {!!value && (
          <Icons.AntDesign name="check" color={Colors.white} size={15} />
        )}
      </Pressable>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RadioButton;
