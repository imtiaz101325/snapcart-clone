import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from './home_screen';
import OtherScreen from './other_screen';
import SignInScreen from './sign_in_screen';
import AuthLoadingScreen from './auth_loading_screen';
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