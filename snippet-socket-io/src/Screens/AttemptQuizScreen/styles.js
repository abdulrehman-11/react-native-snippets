import {StyleSheet} from 'react-native';
import {Colors} from '../../common';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quizContainer: {
    padding: 14,

    backgroundColor: Colors.white,
  },
  submitBtn: {
    marginTop: 10,
    backgroundColor: Colors.blue,
    padding: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backIcon: {
    paddingHorizontal: 10,
    backgroundColor: Colors.blue,
    paddingVertical: 10,
  },
});
export default styles;
