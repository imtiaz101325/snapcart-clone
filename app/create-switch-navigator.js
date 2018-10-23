import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from './home-screen';
import OtherScreen from './other-screen';
import SignInScreen from './sign-in-screen';
import AuthLoadingScreen from './auth-loading-screen';
import Camera from './camera';

const AppStack = createStackNavigator({ Home: HomeScreen, Camera, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);