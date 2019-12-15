import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin';

interface ErrorWithCode extends Error { code?: string };

class SignInScreen extends React.Component<any, { error?: ErrorWithCode | null, userInfo?: User }> {
  static navigationOptions = {
    header: null
  };

  state = {
    error: null,
    user: {} as User
  }

  render() {
    return (
      <Layout>
        <Button fullWidth onPress={this.signIn}>Sign In
        </Button>
        <Button fullWidth onPress={this.signUp}>Sign Up</Button>
      </Layout>
    );
  }

  signIn = async () => {
    await this.googleSignIn();
    this.props.navigation.navigate('App');
  }

  signUp = async () => {
    await this.googleSignIn();
    this.props.navigation.navigate('SignUp');
  }

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.setState({ userInfo, error: null });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };
}

export default SignInScreen;