import React, { useEffect, useMemo } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Pressable, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defaultColors } from '../../themes';
import { Text } from '../../components';
import styles from './styles';
import MoviesPencarian from './MoviePencarian';
import {  useInterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-4479150279616621/9524855080';

export default function Pencarian() {
  const navigation: any = useNavigation();
  const statusBarHeight = getStatusBarHeight();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['Gadgets','Artificial intelligence','Digital innovation','Tech reviews','Education','Online courses','Learning resources','Educational apps','Knowledge enhancement','Healthy lifestyle','Travel destinations','Travel tips'],
  });
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isLoaded) {
      show();
    }
    else {
      isClosed;
    }
  }, [isClosed, isLoaded, show]);

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
              Pencarian Film
            </Text>
          </View>
        </View>
      </View>
    );
  }, [navigation, statusBarHeight]);
  

  return (
    <>
        <ScrollView style={[styles.container]}>
          {renderHeader}
          <MoviesPencarian
            name="Serial Drama Korea"
            category_name="Serial Drama Korea"
          />
        </ScrollView>
    </>
  );
}
