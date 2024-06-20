import {StyleSheet} from 'react-native';
import {Colors} from '../../common';

const styles = StyleSheet.create({
  signInText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInBtn: {
    backgroundColor: Colors.blue,
    padding: 7,
    marginBottom: 24,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    flex: 1,
  },
  password: {
    backgroundColor: Colors.white,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    marginBottom: 24,
    borderColor: Colors.appBackgroundColor,
    borderWidth: 1,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  inputLabel: {
    color: Colors.gray,
    marginBottom: 5,
    paddingLeft: 17,
    fontSize: 14,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    padding: 15,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  text: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.gray,
  },
});
export default styles;
