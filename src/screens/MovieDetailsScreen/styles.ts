import { StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurBackground: {
    position: 'relative',
    width: '100%',
    paddingBottom: 20, // Sesuaikan jarak blur sesuai keinginan
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Sesuaikan nilai alpha sesuai keinginan
    backdropFilter: 'blur(10px)', // Sesuaikan nilai blur sesuai keinginan
  },
  htmlStyles: {
    p: {
      color: defaultColors.text,
    },
    a: {
      color: defaultColors.text,
    },
    strong: {
      color: defaultColors.text,
      fontWeight: 'bold',
    },
    // ... tambahkan gaya lain sesuai kebutuhan
  } as Record<string, any>,
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    flex: 1,
  },
  title: {
    color: defaultColors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  match: {
    color: '#59d467',
    fontWeight: 'bold',
    marginRight: 5,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  playPauseButton: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  playPauseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  year: {
    color: '#757575',
    marginRight: 5,
  },
  showMoreButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: defaultColors.primary,
    borderRadius: 5,
  },
  showMoreButtonText: {
    color: 'white',
    fontSize: 16,
  },
  ageContainer: {
    backgroundColor: defaultColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 3,
    marginRight: 5,
  },
  age: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Button
  playButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: defaultColors.grayText,
    color:'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  downloadButton: {
    backgroundColor: defaultColors.grayText,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
