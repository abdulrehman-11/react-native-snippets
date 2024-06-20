import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Cell, Row, TableWrapper} from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../common';

const CustomTableRow = ({data, index, onPress}) => {
  Feather.loadFont();
  const element = (data, index) => (
    <TouchableOpacity
      style={styles.downloadIconContainer}
      onPress={() => onPress(index)}>
      <Feather name="download" size={22} color={Colors.gray} />
    </TouchableOpacity>
  );
  return (
    <TableWrapper key={index} style={styles.row}>
      {data?.map((cellData, cellIndex) => (
        <Cell
          key={cellIndex}
          data={cellIndex === 2 ? element(cellData, index) : cellData}
          textStyle={styles.text}
          width={140}
        />
      ))}
    </TableWrapper>
  );
};

export default CustomTableRow;

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
    marginRight: 20,
    alignItems: 'center',
  },
});
