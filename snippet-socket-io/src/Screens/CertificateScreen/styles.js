import {StyleSheet} from 'react-native';
import {Colors} from '../../common';
const styles = StyleSheet.create({
  container: {flex: 1},
  header: {height: 60, marginTop: 10, backgroundColor: Colors.lightGray},
  text: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 17,
    color: Colors.fontColorTrainingDetailsHeading,
  },
  row: {flexDirection: 'row'},

  dataWrapper: {marginTop: -1},
  bottomBar: {
    flex: 120,
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  noDataText: {
    marginLeft: 20,
    color: Colors.gray,
  },
});
export default styles;
