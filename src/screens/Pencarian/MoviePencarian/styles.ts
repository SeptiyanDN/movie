import { StyleSheet } from 'react-native';
import { defaultColors } from '../../../themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    margin: 10,
  },
  historyItem: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingVertical: 12,
    paddingHorizontal:20,
  },
  movieImage: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    marginRight: 12,
  },
  movieInfo: {
    flex: 1,
  },
  movieName: {
    fontSize: 18,
    color: defaultColors.text,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'darkgrey',
    marginTop: 5,
  },
  genre: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal:16,
    width: wp(100),

  },
  posterImage: {
    width: 170,
    height: 250,
    borderRadius: 10,
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
  flatlistContainer: {
    paddingHorizontal: 16, // Ruang padding horizontal pada daftar film
    paddingTop: 10, // Ruang padding atas pada daftar film
    paddingBottom: 20, // Ruang padding bawah pada daftar film
  },
  viewHeader: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 8 },
  inputText: {
    width: wp(100) - 32,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    flex: 1,
  },
  inputSearch: {
    fontFamily: 'TTCommons-Regular',
    fontSize: 18,
    marginLeft:10,
    color: defaultColors.text,
  },
  footer: { height: 64, alignItems: 'center' },

});
