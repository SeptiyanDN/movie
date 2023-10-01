import React, { useState, useEffect, useMemo } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import {
  Pressable,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from './styles';
import { useRequest } from '../../utils/services';
import HTML from 'react-native-render-html';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defaultColors } from '../../themes';
import { Text as TextCT } from '../../components';
import Movies from '../movies';
import { Movie, Series } from '../movies/types';
import { saveObjectToAsyncStorage } from '../../utils/helpers/helpers';
import LoadingScreen from '../Loading';

export default function MoviewDetailsScreen() {
  const [description, setDescription] = useState('');
  const [lenSeries, setLenSeries] = useState(0);
  const [movie, setMovies] = useState<Movie>();
  const request = useRequest();
  const windowWidth = useWindowDimensions().width;
  const [seriesSelected, setSeriesSelected] = useState<Series>();
  const statusBarHeight = getStatusBarHeight();
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  interface RouteParams {
    cid?: string; // Jangan lupa tambahkan tanda "?" agar properti ini opsional
  }

  type ParamList = {
    MoviewDetailsScreen: RouteParams;
  };
  const route = useRoute<RouteProp<ParamList, 'MoviewDetailsScreen'>>();
  const cid = route.params?.cid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({
          method: 'post',
          endpoint: '/movies/detail/',
          body: {
            cid: cid,
          },
        });

        const { data } = response;
        setMovies(data);
        setDescription(data.series[0].stream_description);
        setLenSeries(data.series.length);
        setSeriesSelected(data.series[0]);
        setIsLoading(false);
        if (data) {
          saveObjectToAsyncStorage('history', data);
        } else {
          console.error('Movie is undefined');
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, [cid, request]);

  const [selectedEpisode, setSelectedEpisode] = useState<string>('');
  const handleAddFavorite = () => {
    if (movie) {
      saveObjectToAsyncStorage('favorite', movie);
    }
  };
  const episodeList =
  (movie?.series || [])
    .filter(series => series.stream_name !== null)
    .map(series => series.stream_name)
    .sort((a, b) => a.localeCompare(b)); // Sort in ascending order


  const handleEpisodeChange = (itemValue: string) => {
    setSelectedEpisode(itemValue);

    const selectedSeries = movie?.series.find(
      series => series.stream_name === itemValue,
    );
    if (selectedSeries) {
      setSeriesSelected(selectedSeries);
    }
  };
  const renderHeader = useMemo(() => {
    return (
      <View
        style={{
          width: wp(100),
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View
          style={[
            {
              height: 56,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            { marginTop: statusBarHeight },
          ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                height: 56,
                width: 56,
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <IconFeather
                name={'x'}
                size={24}
                color={defaultColors.text}
                style={{
                  marginLeft: 16,
                  color: defaultColors.text,
                }}
              />
            </Pressable>
            <TextCT
              type="medium"
              size={23}
              style={{
                marginLeft: 16,
                color: defaultColors.text,
              }}>
              Streaming Drakor
            </TextCT>
          </View>
        </View>
      </View>
    );
  }, [navigation, statusBarHeight]);

  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleToggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const renderDescription = useMemo(() => {
    const truncatedDescription = description.split('\n').slice(0, 2).join('\n');
    return (
      <Pressable onPress={handleToggleDescription}>
        <HTML
          source={{
            html: isDescriptionExpanded ? description : truncatedDescription,
          }}
          contentWidth={windowWidth}
          tagsStyles={styles.htmlStyles}
        />
      </Pressable>
    );
  }, [
    description,
    handleToggleDescription,
    isDescriptionExpanded,
    windowWidth,
  ]);
  return (
    <ScrollView style={styles.container}>
  {isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <ScrollView style={styles.container}>
      {renderHeader}
      <Image
        style={{ height: 250, width: '100%', position: 'relative' }}
        source={{
          uri:
            seriesSelected?.image ||
            'https://is3.cloudhost.id/movieid/Group%20110.png',
        }}
      />
      <View>
        <View style={{ padding: 12 }}>
          <Text style={styles.title}>{movie?.movie_name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.match}>
              {movie?.total_views.toLocaleString('en-US', {
                minimumFractionDigits: 0,
              })}{' '}
              Total Views
            </Text>
            <Text style={styles.year}>{movie?.years}</Text>
            <View style={styles.ageContainer}>
              <Text style={styles.age}>{movie?.rating}</Text>
            </View>
            <Text style={styles.year}>{lenSeries} Episode</Text>
            <MaterialIcons name="hd" size={24} color="white" />
          </View>
          <Picker
            selectedValue={selectedEpisode}
            onValueChange={handleEpisodeChange}
            style={styles.dropdown}>
            {episodeList.map((episode, index) => (
              <Picker.Item key={index} label={episode} value={episode} />
            ))}
          </Picker>
          <Pressable
            onPress={() => {
              navigation.navigate(
                'StreamingFilm',
                { stream_url: seriesSelected?.stream_url },
                { stream_url_hd: seriesSelected?.stream_url_hd },
              );
            }}
            style={styles.playButton}>
            <Text style={styles.playButtonText}>
              <Entypo name="controller-play" size={16} color="white" />
              Play
            </Text>
          </Pressable>
          <View
            style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
            <Pressable
            onPress={()=> {
              handleAddFavorite();
            }}
            >
              <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                <IconFeather
                  name="bookmark"
                  size={24}
                  color={defaultColors.text}
                />
                <Text style={{ color: 'darkgrey', marginTop: 5 }}>
                  Tambahkan Favorit
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.ageContainer}>
            <Text style={styles.age}>{movie?.genre}</Text>
          </View>
          {renderDescription}
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
          <Text style={{ color: 'darkgrey', marginTop: 5 }}>
            Rekomendasi Untuk Anda
          </Text>
        </View>
        <Movies name="Serial Drama Korea" category_name="Serial Drama Korea" />
        <Movies name="Movie" category_name="Movie" />
      </View>
    </ScrollView>
    </>
  )}
</ScrollView>
  );
  
}
