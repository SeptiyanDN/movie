import { useRef, useCallback, useState, useEffect } from 'react';
import { Animated, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAuthTokens } from '../../../../redux/_reducers/authSlice';
import { useRequest } from '../../../../utils/services/';
import { useOTAVersion } from '../../../../utils/hooks';
import { useAlert } from '../../../../components';
import messaging from '@react-native-firebase/messaging';

export const useLoginScreen = () => {
  const { readableVersion } = useOTAVersion();
  const dispatch = useDispatch();
  const request = useRequest();
  const { show } = useAlert();

  const refInputPassword: any = useRef();
  const refInputUsername: any = useRef();

  const [textInput, setTextInput] = useState<any>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [heightAnim, setHeightAnim] = useState<Number>(0);
  const [secure, setSecure]: any = useState(true);
  const [hide, setHide]: any = useState(false);
  const [state, setState]: any = useState({
    layout: {},
    layout2: {},
    username: '',
    password: '',
  });
 

  const [tokenNotif, setToken] = useState('');

  const getToken = useCallback(async () => {
    const tokenNotifAsli = await messaging().getToken();
    console.log(tokenNotifAsli, 'tokenNotifAsli');
    setToken(tokenNotifAsli);
  }, [setToken]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const animHeight = useRef(new Animated.Value(0)).current;

  const animateFormHeight = useCallback(
    (data: any): void => {
      Animated.spring(animHeight, {
        toValue: data ? 1 : 0,
        useNativeDriver: true,
        bounciness: 10,
        speed: 5,
      }).start();
      setHide(data);
    },
    [animHeight],
  );

  const animateLogin = useCallback((): void => {
    Animated.timing(animHeight, {
      toValue: hide ? 0 : 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
    setHide(false);
    refInputPassword.current.blur();
    refInputUsername.current.blur();
  }, [animHeight, hide]);

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      animateLogin();
      try {
        const res = await request({
          method: 'post',
          endpoint: '/auth/login/',
          body: {
            username,
            password,
            firebase_device_token: tokenNotif,
          },
        });

        console.log('res login', res);

        res.meta.code !== 200
          ? show(res.meta.message)
          : dispatch(
              setAuthTokens({
                accessToken: res.data.token,
                data: res.data,
                refreshToken: res.data.refreshToken,
              }),
            );
      } catch (err) {
        console.log(err);
        show(String(err));
        //handle error
      } finally {
        setIsLoading(false);
      }
    },
    [animateLogin, dispatch, request, show,tokenNotif],
  );

  const translateY = animHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -heightAnim],
  });

  const backToggle = useCallback(() => {
    Keyboard.dismiss();
    animateFormHeight(false);
  }, [animateFormHeight]);

  const focusTextInput = useCallback(
    (data: any) => {
      setTextInput(data);
      hide ? undefined : animateFormHeight(true);
    },
    [hide, animateFormHeight],
  );
  return {
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
    tokenNotif,
    readableVersion,
  };
};
