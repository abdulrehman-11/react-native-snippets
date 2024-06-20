import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Cell, Row, Table, TableWrapper} from 'react-native-table-component';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../common';

const IndependentTable = ({data, formData, firstOne}) => {
  const [tableData, setTableData] = useState([]);
  const {t} = useTranslation();
  const tableHead = [
    t('SAFETY RESPONSIBILITY'),
    t('YesNoOther'),
    t('CommentsActionPlan'),
  ];
  useEffect(() => {
    formatData();
  }, [formData, data]);
  const widthArr = [240, 140, 140];
  const widthSecondHeader = [520];
  const formatData = () => {
    let tempFormat = data?.list?.map((singleItem, index) => {
      return [
        singleItem?.label,
        formData?.[index]?.score ? t('Yes') : 'No',
        formData?.[index]?.comments,
      ];
    });
    setTableData(tempFormat);
  };
  const element = data => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 15,
          height: 15,
          backgroundColor:
            data == 'Si' || data == 'Yes' ? '#28c76f' : Colors.red,
          borderRadius: 15,
          marginRight: -5,
        }}
      />
      <Text style={{...styles.text2, textAlign: 'center'}}>{data}</Text>
    </View>
  );
  const returnRow = (item, index, onPress) => {
    return (
      <TableWrapper key={index} style={styles.row}>
        {item?.map((cellData, cellIndex) => (
          <Cell
            key={cellIndex}
            data={cellIndex === 1 ? element(cellData) : cellData}
            textStyle={styles.text2}
            width={widthArr[cellIndex]}
          />
        ))}
      </TableWrapper>
    );
  };
  return (
    <ScrollView
      horizontal={true}
      style={{marginTop: firstOne ? 0 : 49}}
      showsHorizontalScrollIndicator={false}>
      <View style={{marginTop: 10}}>
        <Table>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.header}
            textStyle={styles.text}
          />
        </Table>
        <Table>
          <Row
            data={[data?.subHeader]}
            widthArr={widthSecondHeader}
            style={styles.header2}
            textStyle={styles.text}
          />
        </Table>
        {tableData?.length > 0 ? (
          <ScrollView
            style={styles.dataWrapper}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <Table
              style={{
                padding: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4.11,
                elevation: 1,
              }}>
              <FlatList
                data={tableData}
                renderItem={({item, index}) => returnRow(item, index)}
              />
            </Table>
          </ScrollView>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default IndependentTable;

const styles = StyleSheet.create({
  header: {height: 60, backgroundColor: Colors.lightGray, marginHorizontal: 10},
  header2: {
    height: 60,
    marginHorizontal: 10,
    backgroundColor: Colors.lightGray,
    borderTopWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.42)',
  },
  text: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 17,
    color: Colors.fontColorTrainingDetailsHeading,
  },
  row: {
    minHeight: 55,
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    flexDirection: 'row',
  },
  text2: {
    textAlign: 'left',
    fontWeight: '500',
    margin: 10,
    fontSize: 15,
    color: '#6e6b7b',
  },
});
