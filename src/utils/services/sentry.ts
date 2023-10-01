import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://9a06a570ac52443c9da2532bf9890230@o4505392868753408.ingest.sentry.io/4505470420058112',
  //   debug: false, // If true, Sentry will display logs in the console
  tracesSampleRate: 1.0,
});

export default Sentry;
