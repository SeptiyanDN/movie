import React, { useMemo, useState } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Pressable, StatusBar, ScrollView, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defaultColors } from '../../themes';
import { Text } from '../../components';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rating from '../Home/Rating';
import Genres from '../Home/Genres';
import { Movie } from '../movies/types';
import { FlatList } from 'react-native-gesture-handler';

export default function Favorit() {
  const navigation: any = useNavigation();
  const statusBarHeight = getStatusBarHeight();
  const [dataArray, setDataArray] = useState([]);
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('favorite');
      if (data) {
        setDataArray(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error getting data from async storage:', error);
    }
  };
  useFocusEffect(() => {
    getData();
  });
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
            <Text
              type="medium"
              size={23}
              style={{
                marginLeft: 16,
                color: defaultColors.text,
              }}>
              Film Favorit Anda
            </Text>
          </View>
        </View>
      </View>
    );
  }, [navigation, statusBarHeight]);

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
  const renderFlatlist = useMemo(() => {
    const sortedDataArray = [...dataArray].reverse();

    return (
      <FlatList
        data={sortedDataArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }, [dataArray, renderItem]);

  return (
    <ScrollView style={[styles.container]}>
      {renderHeader}
      {renderFlatlist}
    </ScrollView>
  );
}
