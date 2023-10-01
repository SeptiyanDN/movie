import React, { useMemo } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  View,
  Pressable,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';
import { Text } from '../../components';
import { useOTAVersion } from '../../utils/hooks';


export default function ProfileScreen() {
  const navigation: any = useNavigation();
  const statusBarHeight = getStatusBarHeight();
  const { readableVersion } = useOTAVersion();

  const profiles = [
    {
      id: '0',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5_C49-HkFimzHQHqQwMLnCq4fHr1pgLtvw&usqp=CAU',
      name: 'Monyet',
    },
    {
      id: '1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQfOPr1m7jryKxiCFP4IShrr88EWnR2mZJQ&usqp=CAU',
      name: 'Daglo',
    },
    {
      id: '2',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU',
      name: 'Kiran',
    },
    {
      id: '3',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yQFL1YOsN3esm6p1jB1HT-Q6qKtxtZqh9LGwMDIgDCy-p54eMf8jdGSN6yZUeySqseA&usqp=CAU',
      name: 'Samarth',
    },
  ];
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
          ]} />
      </View>
    );
  }, [statusBarHeight]);

  const renderVersion = useMemo(() => {
    return (
      <View
        style={{
          width: wp(100),
          marginTop: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text type="regular" size={18} color={defaultColors.grayText}>
          Versi {readableVersion}
        </Text>
      </View>
    );
  }, [readableVersion]);

  return (
    <View style={[styles.container]}>
      {renderHeader}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ height: 50, width: 120, marginTop: 20 }}
          source={{
            uri: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png',
          }}
        />
      </View>

      <View style={{ marginTop: 50, alignItems: 'center' }}>
      <Text type="regular" size={18} color={defaultColors.grayText} style={{alignItems:'center'}}>
          Who's Watching? Profiles
        </Text>

        <FlatList
          numColumns={2}
          data={profiles}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('Home', profiles);
              }}
              style={{ marginHorizontal: 10, padding: 20, marginTop: 10 }}>
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 7,
                  resizeMode: 'contain',
                }}
                source={{ uri: item.image }}
              />
              <Text type="regular" size={18} color={defaultColors.grayText}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <Pressable>
     <View style={{alignItems:'center'}}>
     <Text type="regular" size={18} color={defaultColors.grayText}>
          Keluar
        </Text>
     </View>
      </Pressable>
      {renderVersion}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
});
