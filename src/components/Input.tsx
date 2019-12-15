import React from "react";
import { Dimensions, TextInput, TextInputProps, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("screen");

export interface InputProps extends TextInputProps {
  title?: string
}

const Input: React.FunctionComponent<InputProps> = (props: InputProps) => {
    return (
      <View style={styles.container}>
        {props.title ? <Text style={styles.textStyle}>{props.title}</Text> : null}
        <TextInput style={styles.input} {...props} placeholder={props.title} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    marginTop: 15
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    fontSize: 18,
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
    height: 40
  }
})

export default Input