import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'black',
  },
  video: {
    width: '100%',
    height:'100%',
},
videoFullscreen: {
    width: '100%',
    height: '100%',
},
  overlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  navigationButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  buttonImage: {
      width: 30,
      height: 30,
      tintColor: 'white',
      marginHorizontal: 20,
  },
  sliderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  slider: {
      width: '70%',
  },
  timeText: {
      color: 'white',
  },
  fullScreenButton: {
      position: 'absolute',
      top: 32,
      right: 20,
  },
  fullScreenImage: {
      width: 15,
      height: 15,
      tintColor: 'white',
  },
  qualityIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginVertical: 10,
},
loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
});
export default styles;
