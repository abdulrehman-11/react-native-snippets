import {StyleSheet} from 'react-native';
import {Colors} from '../../common';

const styles = StyleSheet.create({
  container: {flex: 1},
  cardContainer: {
    backgroundColor: Colors.white,
    minHeight: 160,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
    width: '100%',
  },
  headingText: {
    fontSize: 23,
    fontWeight: '500',
    color: Colors.fontColorTrainingDetailsHeading,
  },
  signInBtn: {
    backgroundColor: Colors.blue,
    padding: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: '40%',
    alignSelf: 'flex-end',
  },
  signInText: {
    color: Colors.white,
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
