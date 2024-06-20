import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../common';

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 250,
  },
  img: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: '45%',
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  token: {
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    color: Colors.primary,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  price: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.darkSapphire2,
    fontFamily: Fonts.SemiBold,
  },
  expiry: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;
