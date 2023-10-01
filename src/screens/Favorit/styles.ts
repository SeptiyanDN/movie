import { StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  historyContainer: {
    margin: 16,
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
  cardContainer: {
    width: 180,
    margin: 10,
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
});
export default styles;
