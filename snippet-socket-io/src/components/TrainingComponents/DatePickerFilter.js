import {StyleSheet, Modal, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DateRangePicker from 'rn-select-date-range';
import moment from 'moment';
import {Colors} from '../../common';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import lang from '../../common/languages/lang';

const DatePickerFilter = ({
  onDateSelected,
  startDate,
  endDate,
  clearFilterDates,
}) => {
  const {t} = useTranslation();
  Ionicon.loadFont();
  const [selectedRange, setRange] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const confirmSelection = () => {
    if (selectedRange?.firstDate && selectedRange?.secondDate) {
      setModalVisible(false);
      onDateSelected(selectedRange);
      return;
    }
  };
  const clearFilterPressed = () => {
    setRange({});
    clearFilterDates();
  };
  return (
    <>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setModalVisible(true)}>
          <Ionicon size={20} name="calendar-outline" />
          <Text
            style={
              startDate
                ? styles.selectedDateStyleActive
                : styles.selectedDateStylePlaceHolder
            }>
            {startDate && endDate
              ? `${startDate} to ${endDate}`
              : `${t(lang.SelectDateRange)}`}
          </Text>
        </TouchableOpacity>
        {startDate ? (
          <TouchableOpacity
            style={styles.clearFilterContainer}
            onPress={clearFilterPressed}>
            <Text style={styles.clearFilterText}>{t(lang.Clear)}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicon
              onPress={() => setModalVisible(false)}
              name="close-circle"
              size={26}
              color={Colors.red}
              style={styles.crossIcon}
            />
            <FlashMessage position={'center'} style={{zIndex: 10000}} />
            <View style={styles.modelContainer}>
              <DateRangePicker
                onSelectDateRange={range => {
                  setRange(range);
                }}
                confirmBtnTitle={t(lang.Select)}
                clearBtnTitle={t(lang.Clear)}
                onConfirm={confirmSelection}
                blockSingleDateSelection={true}
                responseFormat="YYYY-MM-DD"
                maxDate={moment().add(1000, 'days')}
                minDate={moment().subtract(1000, 'days')}
                selectedDateContainerStyle={styles.selectedDateContainerStyle}
                selectedDateStyle={styles.selectedDateStyle}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DatePickerFilter;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(73, 73, 73, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    width: '90%',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modelContainer: {width: '95%'},
  crossIcon: {
    alignSelf: 'flex-end',
    zIndex: 5,
    top: -10,
    left: -5,
  },
  selectedDateStylePlaceHolder: {
    color: Colors.gray,
    fontSize: 14,
    marginLeft: 8,
  },
  selectedDateStyleActive: {
    color: Colors.black,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '400',
  },
  containerDate: {
    margin: 5,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonColor,
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  clearFilterContainer: {
    backgroundColor: Colors.red,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 7,
    justifyContent: 'center',
  },
  clearFilterText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 13,
  },
});
