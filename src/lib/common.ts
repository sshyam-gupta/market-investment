import { AsyncStorage } from "react-native";

export const getUserData = async () => await AsyncStorage.getItem('userInfo');

export default {};