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
  notificationHeadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardNotification: {
    minHeight: 70,
    marginBottom: 10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 3,
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 5,
    marginLeft: 15,
  },
  description: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 15,
  },
  unReadText: {
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 14,
    color: Colors.black,
    marginBottom: 5,
  },
  noNotifications: {
    textAlign: 'center',
    padding: 10,
    color: Colors.black,
    fontSize: 15,
    marginBottom: -10,
  },
});
export default styles;
