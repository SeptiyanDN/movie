import React, { useMemo } from 'react';
import { View, StatusBar, Animated, TextInput, Image } from 'react-native';
import {
  Text,
  Button,
  MovingCircle,
  Loader,
  Pressable,
} from '../../../components';
import IconFeather from 'react-native-vector-icons/Feather';
import { useLoginScreen } from './_hooks';
import { styles } from './styles';
import { defaultColors } from '../../../themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


const Login = () => {

  const {
    refInputPassword,
    refInputUsername,
    textInput,
    isLoading,
    secure,
    hide,
    state,
    handleLogin,
    translateY,
    backToggle,
    focusTextInput,
    setHeightAnim,
    setSecure,
    setState,
    setTextInput,
    readableVersion,
  } = useLoginScreen();

  const renderMovingCirlce = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateY }],
          },
        ]}>
        <MovingCircle
          size={15}
          color="#C019E5"
          duration={2500}
          movementFactor={1.5}
        />
      </Animated.View>
    );
  }, [translateY]);

  const renderMovingCirlce2 = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.circle2,
          {
            transform: [{ translateY }],
          },
        ]}>
        <MovingCircle
          size={15}
          color="#F42750"
          duration={2000}
          movementFactor={1}
        />
      </Animated.View>
    );
  }, [translateY]);

  const renderMovingCirlce3 = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.circle3,
          {
            transform: [{ translateY }],
          },
        ]}>
        <MovingCircle
          size={70}
          color="#F8C420"
          duration={3000}
          movementFactor={0.5}
        />
      </Animated.View>
    );
  }, [translateY]);

  const renderMovingCirlce4 = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.circle4,
          {
            transform: [{ translateY }],
          },
        ]}>
        <MovingCircle
          size={20}
          color="#F42750"
          duration={2000}
          movementFactor={0.8}
        />
      </Animated.View>
    );
  }, [translateY]);

  const renderFormUsername = useMemo(() => {
    return (
      <View>
        <TextInput
          placeholderTextColor={'gray'}
          // keyboardType="number-pad"
          placeholder={textInput === '1' ? '' : 'Username'}
          ref={refInputUsername}
          onFocus={() => focusTextInput('1')}
          onBlur={() => setTextInput(0)}
          value={state.username}
          onChangeText={text => setState({ ...state, username: text })}
          onSubmitEditing={() => refInputPassword.current.focus()}
          style={[
            styles.formUsername,
            {
              borderWidth: textInput === '1' ? 1.5 : 0,
              backgroundColor: textInput === '1' ? 'white' : '#F5F5F5',
            },
          ]}
        />
        <Pressable
          onPress={() => refInputUsername.current.focus()}
          style={styles.containerIconUsername}>
          <Image
            source={require('../../../assets/images/iconUser.webp')}
            style={styles.iconUsername}
          />
        </Pressable>
      </View>
    );
  }, [
    textInput,
    refInputUsername,
    state,
    focusTextInput,
    setTextInput,
    setState,
    refInputPassword,
  ]);

  const renderFormPassword = useMemo(() => {
    return (
      <View>
        <TextInput
          ref={refInputPassword}
          placeholderTextColor={'gray'}
          placeholder={textInput === '2' ? '' : 'Password'}
          onFocus={() => focusTextInput('2')}
          onBlur={() => setTextInput(0)}
          value={state.password}
          onSubmitEditing={() => handleLogin(state.username, state.password)}
          onChangeText={text => setState({ ...state, password: text })}
          secureTextEntry={secure}
          style={[
            styles.formPassword,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderWidth: textInput === '2' ? 1.5 : 0,
              backgroundColor: textInput === '2' ? 'white' : '#F5F5F5',
            },
          ]}
        />
        <Image
          source={require('../../../assets/images/iconPassword.webp')}
          style={styles.iconPassword}
        />
        <Pressable
          onPress={() => setSecure(!secure)}
          style={styles.containerEye}>
          <Image
            source={
              secure
                ? require('../../../assets/images/eye-off.webp')
                : require('../../../assets/images/eye.webp')
            }
            defaultSource={
              secure
                ? require('../../../assets/images/eye-off.webp')
                : require('../../../assets/images/eye.webp')
            }
            style={{
              height: secure ? 23 : 19,
              width: secure ? 27 : 28,
              marginTop: secure ? 1.5 : 0,
              resizeMode: 'cover',
            }}
          />
        </Pressable>
      </View>
    );
  }, [
    focusTextInput,
    handleLogin,
    refInputPassword,
    secure,
    setSecure,
    setState,
    setTextInput,
    state,
    textInput,
  ]);

  const renderBtnLogin = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.containerForgotLogin,
          {
            transform: [{ translateY }],
          },
        ]}>
        <Button style={styles.containerForgot}>
          <View>
            <Text type={'bold'} size={20} color={'white'}>
              Lupa Password
            </Text>
            <View style={styles.underline} />
          </View>
        </Button>
        <Button
          onPress={() => handleLogin(state.username, state.password)}
          style={styles.buttonLogin}>
          <Text type={'bold'} size={21} color={defaultColors.primary}>
            Log in
          </Text>
        </Button>
      </Animated.View>
    );
  }, [handleLogin, state.password, state.username, translateY]);

  const renderForm = useMemo(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.containerForm,
            {
              transform: [{ translateY }],
            },
          ]}>
          {renderFormUsername}
          {renderFormPassword}
        </Animated.View>
        {hide && renderBtnLogin}
      </>
    );
  }, [
    translateY,
    renderFormUsername,
    renderFormPassword,
    hide,
    renderBtnLogin,
  ]);

  const renderVersion = useMemo(() => {
    return (
      <View
        style={{
          width: wp(100),
          marginTop: 16,
        }}>
        <Text type="regular" size={18} color={defaultColors.grayText}>
          Versi {readableVersion}
        </Text>
      </View>
    );
  }, [readableVersion]);

  const renderText = useMemo(() => {
    return (
      <Animated.View
        style={{ opacity: hide ? 0 : 1 }}
        onLayout={event => {
          const { x, y, width, height } = event.nativeEvent.layout;
          const newLayout = {
            height: height,
            width: width,
            left: x,
            top: y,
          };
          setHeightAnim(height);
          setState({ ...state, layout: newLayout });
        }}>
        <View style={styles.containerText}>
        </View>
        <Text type={'regular'} size={20} color={'white'}>
        Aplikasi Streaming drama Asia Sub Indonesia kesukaan Anda kapan serta di mana saja.
        </Text>
      </Animated.View>
    );
  }, [hide, setHeightAnim, setState, state]);

  const renderWelcome = useMemo(() => {
    return (
      <Text type={'bold'} size={32} color={'white'}>
        {hide ? 'Silahkan Login!' : 'MOVIE.ID'}
      </Text>
    );
  }, [hide]);

  const renderGoBack = useMemo(() => {
    return (
      hide && (
        <Pressable onPress={backToggle} style={styles.back}>
          <IconFeather name={'arrow-left'} color="#222222" size={22} />
        </Pressable>
      )
    );
  }, [backToggle, hide]);

  const renderImgHeader = useMemo(() => {
    return (
      <View style={styles.containerImgHeader}>
        <Image
          source={require('../../../assets/images/header.png')}
          style={styles.imgHeader}
        />
      </View>
    );
  }, []);

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
    <>
      <View style={styles.container}>
        {renderStatusBar}
        <View style={styles.containerCenter}>
          <>
            {renderVersion}
            {renderWelcome}
            {renderText}
            {renderForm}
          </>
        </View>
        {renderGoBack}
        {renderMovingCirlce}
        {renderMovingCirlce2}
        {renderMovingCirlce3}
        {renderMovingCirlce4}
        {renderImgHeader}
      </View>
      {isLoading && <Loader />}
    </>
  );
};

export default Login;
