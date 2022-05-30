/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blocarc.app',
  appName: 'Bloc Arc App',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId:
        '231112942946-dn6btk0fss8q4m78uvdolu4hvcqktpjv.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
