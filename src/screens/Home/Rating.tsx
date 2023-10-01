import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const starsArray = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      {starsArray.map((type, index) => (
        <AntDesign key={index} name={type} size={12} color="tomato" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingNumber: {
    marginRight: 4,
    fontFamily: 'Menlo',
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
});

export default Rating;
