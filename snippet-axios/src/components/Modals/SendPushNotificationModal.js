import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {Checkbox} from 'native-base';

import {Colors, TextSizes} from '../../common';
import {Button} from '../Buttons';
import {Text} from '../index';

const SendPushNotificationModal = ({
  employees,
  visible,
  setVisible,
  onAccept,
  onReject,
}) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAllEmployees, setSelectAllEmployees] = useState(false);

  const handleSelectAndUnSelectAll = () => {
    if (selectAllEmployees) {
      setSelectedEmployees(employees.map(employee => employee.id));
    } else {
      setSelectedEmployees([]);
    }
    setSelectAllEmployees(!selectAllEmployees);
  };

  const handleEmployeeCheck = id => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(
        selectedEmployees.filter(employee => employee !== id),
      );
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View style={styles.logOutContainer}>
        <View>
          <Text style={styles.warnText}>
            Send push notification to your employee group?
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Checkbox
            onChange={() => handleSelectAndUnSelectAll()}
            isChecked={!selectAllEmployees}
            aria-label="select-employees"
          />
          <Text style={{marginLeft: 10}}>
            {selectAllEmployees ? 'Select' : 'Unselect'} All
          </Text>
        </View>

        <ScrollView>
          {employees.map(employee => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  onChange={() => handleEmployeeCheck(employee.id)}
                  aria-label="terms and services"
                  isChecked={selectedEmployees.includes(employee.id)}
                />
                <Text style={{marginLeft: 10}}>{employee.name}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.btnRow}>
          <Button
            title="No"
            style={styles.btnStyle2}
            textStyle={styles.txtStyles}
            onPress={() => {
              onReject();
              setVisible(false);
            }}
          />
          <Button
            title="Yes"
            style={styles.btnStyle}
            textStyle={styles.txtStyles}
            onPress={() => {
              onAccept(selectedEmployees);
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnStyle: {
    backgroundColor: Colors.darkBlue,
    width: '40%',
    height: 50,
  },
  btnStyle2: {
    backgroundColor: Colors.RED,
    width: '40%',
    height: 50,
  },
  txtStyles: {
    color: Colors.WHITE,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  warnText: {
    textAlign: 'center',
  },
  warnStyle: {
    textAlign: 'center',
    fontSize: TextSizes.LargeHeading,
    color: Colors.red,
  },
  logOutContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    maxHeight: 500,
  },
  lottieContianer: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: '100%',
  },
});

export default SendPushNotificationModal;
