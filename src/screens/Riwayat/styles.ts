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
  cardContainer: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  cardHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
});
export default styles;
