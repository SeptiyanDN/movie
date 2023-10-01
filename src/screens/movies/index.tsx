import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { styles } from './syles';
import { defaultColors } from '../../themes';
import TextCT from '../../components/item/atoms/Text';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useRequest } from '../../utils/services';

interface Movie {
  category_name: string;
  cid: number;
  genre: string;
  image: string;
  movie_name: string;
  new_episode: string;
  ongoing: boolean;
  rating: string;
  series_count: number;
  total_views: number;
  years: string;
}

interface MoviesProps {
  name: string;
  category_name: string;
}

const Movies: React.FC<MoviesProps> = ({ name, category_name }) => {
  const navigation: any = useNavigation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const request = useRequest();
  const fetchMovies = useCallback(async () => {
    try {
      const response = await request({
        method: 'post',
        endpoint: '/movies/list/',
        body: {
          search: '',
          limit: 15,
          offset: 1,
          order_column: 'updated_at',
          order_direction: 'desc',
          category_name: category_name,
        },
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
    }
  }, [category_name, request]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderMovieItem = ({ item: movie }: { item: Movie }) => (
    <Pressable
      key={movie.cid}
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('MoviewDetailsScreen', { cid: movie.cid });
      }}>
      <Image
        style={styles.posterImage}
        source={{
          uri: movie.image,
        }}
      />
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
          {movie.movie_name}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.totalViewsText}>
          {movie.total_views.toLocaleString('en-US', {
            minimumFractionDigits: 0,
          })}{' '}
          Views
        </Text>
        <Text style={styles.statusText}>
          {movie.ongoing ? 'Complete' : 'Ongoing'}
        </Text>
      </View>
    </Pressable>
  );

  const renderFlatlist = useMemo(() => {
    if (!movies) {
      return null; // Return null when movies is not yet defined
    }
    return (
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        data={movies.slice(0, 10)}
        keyExtractor={item => item.cid.toString()}
        renderItem={renderMovieItem}
      />
    );
  }, [movies, renderMovieItem]);
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}>
        <TextCT
          type="semibold"
          size={23}
          style={{
            color: defaultColors.text,
          }}>
          {name}
        </TextCT>
        <Pressable
          onPress={() => {
            navigation.navigate('Pencarian');
          }}>
          <TextCT
            type="regular"
            size={16}
            style={{
              color: defaultColors.grayText,
            }}>
            See More
          </TextCT>
        </Pressable>
      </View>
      {renderFlatlist}
    </View>
  );
};

export default Movies;
