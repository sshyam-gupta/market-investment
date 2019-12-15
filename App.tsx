import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Reports: ReportsScreen,
});

const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default AppNavigator;