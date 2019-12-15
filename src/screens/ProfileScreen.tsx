import React from "react";
import { AsyncStorage, Image, StyleSheet } from "react-native";
import Layout from "../components/Layout";
import { User } from "@react-native-community/google-signin";
import _ from "lodash";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from "../components/Button";
import Input from "../components/Input";
import { getUserData } from "../lib/common";


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
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
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: userData.user.photo || '' }} style={styles.profileImage} />
          <Input title={"Email"} defaultValue={userData.user.email || ''} textContentType="emailAddress" />
          <Input title={"Name"} defaultValue={userData.user.name || ''} textContentType="name" />
          <Input title={"Given Name"} defaultValue={userData.user.givenName || ''} textContentType="emailAddress" />
          <Input title={"Family Name"} defaultValue={userData.user.familyName || ''} textContentType="emailAddress" />
          <Button fullWidth onPress={this.saveProfileData}>Save</Button>
        </KeyboardAwareScrollView>
      )
    }
  }

  saveProfileData = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Layout>
        {this.renderUserData()}
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center", paddingVertical: 30
  },
  profileImage: {
    width: 150, height: 150, borderRadius: 75, marginBottom: 20
  }
});

export default ProfileScreen;