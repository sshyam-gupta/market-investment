import React from "react";
import { Button as ReactButton, AsyncStorage, Text, Image, ScrollView } from "react-native";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { GoogleSignin, User } from "@react-native-community/google-signin";
import _ from "lodash";
import { getUserData } from "../lib/common";
import Information from "../components/Information";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dashboard',
    headerRight: () => (
      <ReactButton
        onPress={async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.navigate('Auth');
          } catch (error) {
            console.log(error)
          }
        }}
        title="Sign out"
        color="#000"
      />
    )
  });

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

  render() {
    return (
      <Layout>
        <ScrollView>
          <Information
            title="Amount Invested"
            value="₹ 100,000"
          />
          <Information
            title="Return Expected"
            value="₹ 105,000"
          />
          <Information
            title="Return Received"
            value="₹ 5,000"
          />
          <Button
            fullWidth
            onPress={() => this.props.navigation.navigate('Profile')}
          >Profile</Button>
          <Button
            fullWidth
            onPress={() => this.props.navigation.navigate('Reports')}
          >Reports</Button>
        </ScrollView>
      </Layout>
    )
  }
}

export default HomeScreen;