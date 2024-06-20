import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Cell, Row, TableWrapper} from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';

const CustomTableRowsTraining = ({data, index, onPress, widthArr}) => {
  Feather.loadFont();
  const {i18n} = useTranslation();
  const elementActive = (data, index) => {
    if (!data) {
      return;
    }
    const {text, isSuccess} = getTranslationText(data, i18n.language);
    return (
      <View style={styles.downloadIconContainer}>
        <Text
          style={
            data === 'Fail'
              ? styles.failStatus
              : isSuccess
              ? styles.activeStatus
              : styles.inactiveStatus
          }>
          {text}
        </Text>
      </View>
    );
  };

  const elementActions = (data, index) => {
    return (
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => onPress(index)}>
        <Feather name="eye" size={14} color="#7460F0" />
        <Text style={styles.actionText}>
          {i18n.language === 'en-US' ? 'View' : 'Vista'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <TableWrapper key={index} style={styles.row}>
      {data.map((cellData, cellIndex) => (
        <Cell
          key={cellIndex}
          data={
            cellIndex === 3
              ? elementActive(cellData, index)
              : cellIndex === 1
              ? elementActive(cellData, index)
              : cellIndex === 4
              ? elementActions(cellData, index)
              : cellData
          }
          textStyle={styles.text}
          width={widthArr[cellIndex]}
        />
      ))}
    </TableWrapper>
  );
};

export default CustomTableRowsTraining;

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontWeight: '400',
    marginLeft: 10,
    fontSize: 15,
    color: '#6e6b7b',
  },
  row: {
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    flexDirection: 'row',
  },
  downloadIconContainer: {
    justifyContent: 'center',
  },
  activeStatus: {
    backgroundColor: '#28c76f1f',
    color: '#28c76f',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 100,
  },
  failStatus: {
    backgroundColor: '#ea54551f',
    color: '#ea5455',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 100,
  },
  inactiveStatus: {
    backgroundColor: '#ff9f431f',
    color: '#ff9f43',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    borderRadius: 100,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: '#1C75BB',
  },
});

const getTranslationText = (text, language) => {
  if (text === 'Pending' && language === 'en-US') {
    return {
      text: text,
      isSuccess: false,
    };
  } else if (text === 'Completed' && language === 'en-US') {
    return {
      text: text,
      isSuccess: true,
    };
  } else if (text === 'Pending' && language === 'es') {
    return {
      text: 'Pendiente',
      isSuccess: false,
    };
  } else if (text === 'Completed' && language === 'es') {
    return {
      text: 'Terminado',
      isSuccess: true,
    };
  } else if (text === 'Pass' && language === 'en-US') {
    return {
      text: text,
      isSuccess: true,
    };
  } else if (text === 'Pass' && language === 'es') {
    return {
      text: 'Pasar',
      isSuccess: true,
    };
  } else if (text === 'Fail' && language === 'es-US') {
    return {
      text: 'Fail',
      isSuccess: false,
    };
  } else if (text === 'Fail' && language === 'es') {
    return {
      text: 'Fallar',
      isSuccess: false,
    };
  } else
    return {
      text: text,
      isSuccess: true,
    };
};
