import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("screen");

export interface IInformation {
  title: string
  value: string
}

const Information: React.FunctionComponent<IInformation> = (props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    marginTop: 25,
    flexDirection: "column"
  },
  title: {
    fontSize: 17,
    color: '#000',
  },
  value: {
    fontSize: 40
  }
})

export default Information