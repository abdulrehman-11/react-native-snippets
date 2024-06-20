import {StyleSheet} from 'react-native';
import {Colors} from '../../common';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.white,
  },
  formContainer: {
    margin: 15,
    minHeight: 300,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 14,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  phoneInput: {
    backgroundColor: Colors.white,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 7,
    marginBottom: 24,
    borderColor: Colors.gray,
    borderWidth: 0.3,
    color: Colors.black,
  },
  inputLabel: {
    color: Colors.darkGray,
    marginBottom: 5,
  },

  password: {
    backgroundColor: Colors.white,
    height: 55,

    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    marginBottom: 24,
    borderColor: Colors.gray,
    borderWidth: 0.3,
    flexDirection: 'row',
    color: Colors.black,
  },
  signInBtn: {
    backgroundColor: Colors.blue,
    padding: 7,
    marginBottom: 24,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  signInText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: '100%',
    flex: 1,
    color: Colors.gray,
  },
});
export default styles;
