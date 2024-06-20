import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';

import {IconButton} from '../Buttons';
import styles from './styles';
import {Colors} from '../../common';

const DatePicker = ({setDate}) => {
  const [today, setToday] = useState(true);
  const [tomorrow, setTomorrow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [selectDateValue, setSelectDateValue] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handlePress = name => {
    let todayDate = new Date();
    let tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    todayDate = moment(todayDate).format('YYYY-MM-DD');
    tomorrowDate = moment(tomorrowDate).format('YYYY-MM-DD');

    switch (name) {
      case 'Today':
        setToday(true);
        setTomorrow(false);
        setSelectDate(false);
        setDate(todayDate);
        setDatePickerVisibility(false);
        setSelectDateValue(null);
        break;
      case 'Tomorrow':
        setToday(false);
        setTomorrow(true);
        setSelectDate(false);
        setDate(tomorrowDate);
        setDatePickerVisibility(false);
        setSelectDateValue(null);
        break;
      case 'Select a date':
        setToday(false);
        setTomorrow(false);
        setSelectDate(true);
        showDatePicker();
        break;
      default:
        break;
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <View>
      <View style={styles.iconButtonContainer}>
        <IconButton
          onPress={() => handlePress('Today')}
          name={'Today'}
          style={{
            backgroundColor: today ? Colors.blue : Colors.WHITE,
            width: '25%',
          }}
          styleText={{
            color: today ? Colors.WHITE : Colors.blue,
          }}
        />
        <IconButton
          onPress={() => handlePress('Tomorrow')}
          name={'Tomorrow'}
          style={{
            backgroundColor: tomorrow ? Colors.blue : Colors.WHITE,
            width: '30%',
          }}
          styleText={{
            color: tomorrow ? Colors.WHITE : Colors.blue,
          }}
        />
        <IconButton
          onPress={() => handlePress('Select a date')}
          name={selectDateValue ? selectDateValue : 'Select a Date'}
          style={{
            backgroundColor: selectDate ? Colors.blue : Colors.WHITE,
            width: '40%',
          }}
          styleText={{
            color: selectDate ? Colors.WHITE : Colors.blue,
          }}
        />
      </View>
      {isDatePickerVisible && (
        <CalendarPicker
          allowBackwardRangeSelect
          selectedDayColor="#2dbdcf"
          onDateChange={date => {
            setDate(moment(date).format('YYYY-MM-DD'));
            setDatePickerVisibility(false);
            setSelectDateValue(moment(date).format('ll'));
          }}
        />
      )}
    </View>
  );
};

export default DatePicker;
