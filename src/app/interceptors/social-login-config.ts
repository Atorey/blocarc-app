import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '231112942946-lkq8pb0dvg8i4dqtcc5k6ma1apqld34m.apps.googleusercontent.com'
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(
      '0d41fa5e0109a7dd07f85b345ddc6c37'
    ),
  },
]);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function provideConfig() {
  return config;
}
