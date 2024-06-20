import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, InputText, Label} from '../../../components';
import {Icons} from '../../../common';

interface Props {
  errors: any;
  handleChange: any;
  handleBlur: any;
  onContinue: any;
}

const BusinessDetails: FC<Props> = ({errors, handleBlur, handleChange}) => {
  return (
    <>
      <Label title="Contact holder name" />
      <InputText
        placeholder="Enter contact holder name here"
        error={errors['contactName']}
        onChangeText={handleChange('contactName')}
        onBlur={handleBlur('contactName')}
      />
      <Label title="Card Number" />
      <InputText
        placeholder="Enter card number here"
        error={errors['cardNumber']}
        onChangeText={handleChange('cardNumber')}
        onBlur={handleBlur('cardNumber')}
      />
      <Label title="Expiry Date" />
      <InputText
        placeholder="Enter expiry date here"
        error={errors['expiryDate']}
        onChangeText={handleChange('expiryDate')}
        onBlur={handleBlur('expiryDate')}
        icon={<Icons.AntDesign name="calendar" size={18} />}
      />
      <Label title="CVC" />
      <InputText
        placeholder="Enter CVC here"
        maxLength={3}
        keyboardType="number-pad"
        error={errors['cvc']}
        onChangeText={handleChange('cvc')}
        onBlur={handleBlur('cvc')}
      />
      <Button title="Continue" onPress={() => {}} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BusinessDetails;
