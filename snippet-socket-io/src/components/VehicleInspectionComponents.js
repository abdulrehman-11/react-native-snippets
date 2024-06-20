import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Cell, Row, TableWrapper} from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../common';
import {useTranslation} from 'react-i18next';

const VehicleInspectionComponents = ({data, index, onPress}) => {
  Feather.loadFont();
  const {t, i18n} = useTranslation();

  return (
    <TableWrapper key={index} style={styles.row}>
      {data?.map((cellData, cellIndex) => (
        <Cell
          key={cellIndex}
          data={
            cellIndex === 2 ? (
              <TouchableOpacity
                style={styles.actionContainer}
                onPress={() => onPress(index)}>
                <Text
                  style={{
                    color: cellData == 'Add Inspection' ? '#00cfe8' : '#28c76f',
                    backgroundColor:
                      cellData == 'Add Inspection' ? '#00cfe81f' : '#28c76f1f',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    fontWeight: 'bold',
                    borderRadius: 10,
                    textAlign: 'center',
                  }}>
                  {i18n.language === 'en-US'
                    ? cellData === 'Add Inspection'
                      ? t('AddInspection')
                      : t('InspectionCompleted')
                    : cellData === 'Add Inspection'
                    ? t('AddInspection')
                    : t('InspectionCompleted')}
                </Text>
              </TouchableOpacity>
            ) : (
              cellData
            )
          }
          textStyle={styles.text}
          width={cellIndex === 2 ? 200 : 140}
        />
      ))}
    </TableWrapper>
  );
};

export default VehicleInspectionComponents;

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
  // actionText: {
  //   marginLeft: 5,
  //   color: data.status == 'Add Inspection' ? 'blue' : 'green',
  //   backgroundColor: 'red',
  // },
});
