import { StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';

export const styles = StyleSheet.create({
  cardContainer: {
    width: 105,
    margin: 10,
  },
  posterImage: {
    width: 105,
    height: 152,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  titleContainer: {
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 15,
    color: defaultColors.text,
  },
  detailsContainer: {
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  totalViewsText: {
    fontSize: 13,
    color: 'gray',
  },
  statusText: {
    fontSize: 13,
    color: 'green', // Change color based on your requirement
  },
});
