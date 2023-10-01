import { StyleSheet } from 'react-native';
import { defaultColors } from '../../../themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  expandedCard: {
    backgroundColor: defaultColors.grayBackground,
    padding: 20,
    width: wp(100) - 60,
    marginLeft:20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  box: {
    height: 55,
    width: wp(100) - 50,
    marginLeft:30,
    backgroundColor: defaultColors.white,
    flexDirection: 'row',
  },
  centerBox: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textBox: {
    height: 55,
    width: wp(100) - 110 - 32,
    justifyContent: 'center',
  },
});

export default styles;
