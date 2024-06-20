import {StyleSheet} from 'react-native';
import {Colors} from '../../../common';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.lightgrey,
  },
});

export default styles;
