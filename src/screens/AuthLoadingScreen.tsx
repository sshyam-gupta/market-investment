import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SplashScreen from 'react-native-splash-screen' 

class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    SplashScreen.hide()
    const initialLink = await dynamicLinks().getInitialLink();
    
    if (initialLink) {
      if (initialLink.url === 'https://marketinvestments.page.link/reports') {
        this.props.navigation.navigate("Reports");
      }
      return;
    }

    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: "185068763105-alv1cn3fimd5ivsq7n2rog4nmd9bb10s.apps.googleusercontent.com",
      offlineAccess: false,
    });
  }

  async _getCurrentUser() {
    try {
      await GoogleSignin.signInSilently();
      this.props.navigation.navigate("App");
    } catch (error) {
      this.props.navigation.navigate("Auth");
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;