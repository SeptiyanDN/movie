import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  Platform,
  FlatList,
} from 'react-native';
import Genres from './Genres';
import Rating from './Rating';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRequest } from '../../utils/services';
import { Pressable } from '../../components';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const width = wp('100%');  // Menggunakan 100% untuk mengisi lebar layar
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading: React.FC = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);
interface BackdropProps {
  movies: any[];
  scrollX: Animated.Value;
}

const BACKDROP_HEIGHT = 800; // Ganti dengan nilai yang sesuai

const Backdrop: React.FC<BackdropProps> = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.image) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height: BACKDROP_HEIGHT,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};


const Header: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const request = useRequest();
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovies = await request({
        method: 'post',
        endpoint: '/movies/list/',
        body: {
          search: '',
          limit: 15,
          offset: 1,
          order_column: 'updated_at',
          order_direction: 'desc',
          category_name: 'Serial Drama Korea',
        },
      });
      setMovies([{ key: 'empty-left' }, ...fetchedMovies.data, { key: 'empty-right' }]);
    };
    if (movies.length === 0) {
      fetchData();
    }
  }, [movies, request]);

  if (movies.length === 0) {
    return <Loading />;
  }
  
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.image) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Pressable
                onPress={() => {
                  navigation.navigate('MoviewDetailsScreen', { cid: item.cid });
                }}
              >
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    transform: [{ translateY }],
                    backgroundColor: 'white',
                    borderRadius: 34,
                    marginBottom: 100,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.posterImage}
                  />
                  <Text style={{ fontSize: 24 }} numberOfLines={1}>
                    {item.movie_name}
                  </Text>
                  <Rating rating={item.rating} />
                  <Genres genre={item.genre} />
                </Animated.View>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default Header;
