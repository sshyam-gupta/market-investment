import React from "react";
import { AsyncStorage } from "react-native";
import Layout from "../components/Layout";
import { User } from "@react-native-community/google-signin";
import _ from "lodash";
import Input from "../components/Input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from "../components/Button";
import { getUserData } from "../lib/common";

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign up!',
  };

  state = {
    userData: {} as User
  }

  async componentDidMount() {
    const userData = await getUserData();
    if (!userData) {
      return;
    }
    this.setState({
      userData: JSON.parse(userData)
    })
  }

  renderUserData = () => {
    const { userData } = this.state;
    if (!_.isEmpty(userData)) {
      console.log(userData)
      return (
        <KeyboardAwareScrollView>
          <Input title={"Name"} defaultValue={userData.user.name || ''} textContentType="name" />
          <Input title={"Email"} defaultValue={userData.user.email || ''} textContentType="emailAddress" />
          <Input title={"Phone"} keyboardType={"phone-pad"} textContentType="telephoneNumber" />
          <Input title={"Password"} textContentType="password" secureTextEntry={true}  />
          <Button onPress={this.signUp}>Sign Up</Button>
        </KeyboardAwareScrollView>
      )
    }
  }

  signUp = () => {
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <Layout>
        {this.renderUserData()}
      </Layout>
    )
  }
}

export default SignUpScreen;