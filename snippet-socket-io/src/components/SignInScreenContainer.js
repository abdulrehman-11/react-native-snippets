import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../common/Colors';
import Screen from './Screen';
import {useHeaderHeight} from '@react-navigation/elements';

const SignInScreenContainer = ({children}) => {
  const height = useHeaderHeight();

  return (
    <Screen>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={height + 47}
          behavior="padding"
          enabled>
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>{children}</View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.white,
  },
});

export default SignInScreenContainer;
