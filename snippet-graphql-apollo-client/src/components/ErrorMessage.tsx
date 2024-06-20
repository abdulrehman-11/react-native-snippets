import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '.';

interface ErrorMessageProps {
  error?: string;
  visible?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error, visible}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginLeft: 5, marginTop: 2},
  error: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ErrorMessage;
