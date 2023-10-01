import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GenresProps {
  genre: string;
}

const Genres: React.FC<GenresProps> = ({ genre }) => {
  return (
          <View key={genre} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
  );
};

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 9,
    opacity: 0.4,
  },
});

export default Genres;
