import {StyleSheet} from 'react-native';
import {Colors} from '../../common';
const styles = StyleSheet.create({
  header: {height: 60, marginTop: 10, backgroundColor: Colors.lightGray},
  text: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 17,
    color: Colors.fontColorTrainingDetailsHeading,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    minHeight: 160,
    margin: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dataWrapper: {marginTop: -1},
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  containerCol: {
    flex: 1,
    padding: 10,
  },
  maintitle: {
    paddingBottom: 10,
    color: Colors.black,
    fontWeight: 'bold',
  },
  title: {
    paddingBottom: 10,
    color: Colors.black,
  },
  insideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  insideContainerCol: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  addInspection: {
    width: '90%',
    backgroundColor: Colors.blue,
    padding: 14,
    alignItems: 'center',
    borderRadius: 7,
  },
  addInspectionText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 17,
    alignItems: 'center',
  },
  addInspectionContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  heading: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
});
export default styles;
