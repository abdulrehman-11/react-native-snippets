import {StyleSheet} from 'react-native';
import {Colors} from '../../../common';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  inputContainer: {marginVertical: 10},
  accountContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  imgGoogle: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    marginRight: 10,
  },
  googleContainer: {
    borderRadius: 4,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderWidth: 1,
    paddingVertical: 10,
    elevation: 3,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgVector: {
    width: '30%',
    height: 2,
  },
  divider: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
