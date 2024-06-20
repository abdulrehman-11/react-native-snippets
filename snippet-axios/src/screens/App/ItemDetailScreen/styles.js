import {StyleSheet} from 'react-native';
import {Colors, Fonts, TextSizes} from '../../../common';

const styles = StyleSheet.create({
  valuesContainer: {
    paddingLeft: '10%',
    width: '80%',
    alignSelf: 'center',
    marginVertical: '1%',
  },
  personImage: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
  },
  name: {
    fontSize: TextSizes.SubHeading,
    color: Colors.darkBlue,
    marginRight: '5%',
    fontFamily: Fonts.SemiBold,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
    width: '95%',
  },
  title: {
    color: Colors.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;
