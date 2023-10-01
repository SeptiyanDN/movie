import React, { useMemo } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import Header from './header';
import Movies from '../movies';

export default function HomeScreen() {
  const renderStatusBar = useMemo(() => {
    return (
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
    );
  }, []);

  return (
    <ScrollView style={[styles.container]}>
      {renderStatusBar}
      <Header />
      <Movies name="Serial Drama Korea" category_name="Serial Drama Korea" />
      <Movies name="Movie" category_name="Movie" />
      <Movies name="Variety Show" category_name="Variety Show" />
      <Movies
        name="Serial Drama Thailand"
        category_name="Serial Drama Thailand"
      />
      <Movies name="Serial Drama Jepang" category_name="Serial Drama Jepang" />
      <Movies name="Serial Drama China" category_name="Serial Drama China" />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
});
