import React, { useCallback, useMemo } from 'react';
import { View, Image, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { defaultColors } from '../../../themes';
import { usePencarianScreen } from '../_hooks';
import { EmptyList, Text, Error } from '../../../components';
import Loading from '../../../components/item/atoms/Loader';
import Rating from '../../Home/Rating';
import Genres from '../../Home/Genres';

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

const MoviesPencarian: React.FC<MoviesProps> = ({}) => {
  const navigation: any = useNavigation();
  const {
    handleSearch,
    setSearchMovie,
    searchMovie,
    statusRenderGuest,
    handleLoadMore,
    listMovie,
    handleTryAgain,
  } = usePencarianScreen();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderItem = ({ item }: { item: Movie }) => (
    <Pressable
      key={item.cid}
      onPress={() => {
        navigation.navigate('MoviewDetailsScreen', { cid: item.cid });
      }}>
      <View style={styles.historyItem}>
        <Image source={{ uri: item.image }} style={styles.movieImage} />
        <View style={styles.movieInfo}>
          <Text
            type="bold"
            size={20}
            style={{
              marginLeft: 16,
              color: defaultColors.text,
            }}>
            {item?.movie_name}
          </Text>
          <Text
            type="medium"
            size={15}
            style={{
              marginLeft: 16,
              color: defaultColors.text,
            }}>
            {item?.category_name}
          </Text>
          <View style={styles.genre}>
            <Rating rating={parseFloat(item.rating)} />
          </View>
          <Text
            type="medium"
            size={15}
            style={{
              marginLeft: 16,
              color: 'green',
            }}>
            {item.ongoing ? 'Complete' : 'Ongoing'}
          </Text>
          <View style={styles.genre}>
            <Genres genre={item.genre} />
          </View>
        </View>
      </View>
    </Pressable>
  );
  const renderHeader = useMemo(() => {
    return (
      <View style={styles.viewHeader}>
        <View style={styles.inputText}>
          <TextInput
            placeholder="Search"
            onChangeText={setSearchMovie}
            value={searchMovie}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch()}
            placeholderTextColor={defaultColors.text}
            style={styles.inputSearch}
          />
        </View>
      </View>
    );
  }, [handleSearch, searchMovie, setSearchMovie]);

  const renderFlatlist = useMemo(() => {
    return (
      <FlatList
        data={listMovie}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
      />
    );
  }, [handleLoadMore, listMovie, renderItem]);

  const renderStatus = useCallback(
    (status: string) => {
      switch (status) {
        case 'loading':
          return <Loading />;
        case 'error':
          return <Error onPress={() => handleTryAgain()} />;
        case 'empty':
          return <EmptyList message={'Pencarian Film Favorit Anda'} />;
        case 'show':
          return renderFlatlist;
        default:
          return <View style={{ flex: 1 }} />;
      }
    },
    [handleTryAgain, renderFlatlist],
  );
  return (
    <View>
      {renderHeader}
      {renderStatus(statusRenderGuest)}
    </View>
  );
};

export default MoviesPencarian;
