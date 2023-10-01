import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import styles from './syles';
import { RouteProp, useRoute } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {  useRewardedAd } from 'react-native-google-mobile-ads';
const adUnitId = 'ca-app-pub-4479150279616621/8124714328';

export default function StreamingFilm() {
  const [fullScreen, setFullScreen] = useState(false);
  const { isLoaded, isClosed, load, show } = useRewardedAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: [
      'Gadgets',
      'Artificial intelligence',
      'Digital innovation',
      'Tech reviews',
      'Education',
      'Online courses',
      'Learning resources',
      'Educational apps',
      'Knowledge enhancement',
      'Healthy lifestyle',
      'Travel destinations',
      'Travel tips',
    ],
  });

  const toggleFullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  interface RouteParams {
    stream_url: string;
    stream_url_hd: string;
  }

  type ParamList = {
    StreamingFilm: RouteParams;
  };

  const route = useRoute<RouteProp<ParamList, 'StreamingFilm'>>();
  const stream_url = route.params?.stream_url;
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isLoaded) {
      show();
    } else {
      isClosed;
    }
  }, [isClosed, isLoaded, show]);

  return (
        <View style={styles.container}>
          <Video
            source={{ uri: stream_url }}
            style={fullScreen ? styles.videoFullscreen : styles.video}
            fullscreen={fullScreen}
            controls={true}
            onFullscreenPlayerWillPresent={toggleFullScreen}
            onFullscreenPlayerWillDismiss={toggleFullScreen}
          />
        </View>
  );
}
