import {StyleSheet} from 'react-native';
import {Colors} from '../../common';

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {height: 60, backgroundColor: Colors.lightGray},
  table: {
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.11,

    elevation: 1,
  },
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
    marginTop: 10,
    padding: 10,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 5,
  },
  filterText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.buttonColor,
  },
  containerDate: {
    margin: 5,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonColor,
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  noDataText: {
    marginLeft: 20,
    color: Colors.gray,
  },
});

export default styles;
