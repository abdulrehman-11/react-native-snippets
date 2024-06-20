import {StyleSheet} from 'react-native';
import {Colors} from '../../common';

const styles = StyleSheet.create({
  upperContainer: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
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
  textLabelContainer: {
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 17,
  },
  valueText: {
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
  },
});

export default styles;
