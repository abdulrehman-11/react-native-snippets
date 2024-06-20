import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {},
  card: {
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '90%',
    padding: 10,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    marginLeft: 10,
  },
  img: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
export default styles;
