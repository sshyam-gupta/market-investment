import React from 'react'
import PlatformTouchable from './PlatformTouchable'
import { StyleSheet, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("screen");

export interface ButtonProps {
  onPress?: () => any
  style?: any
  disabled?: boolean
  fullWidth?: boolean
}

class Button extends React.Component<ButtonProps> {
  onPress = () => {
    const { onPress, disabled } = this.props

    if (typeof onPress === 'function' && !disabled) {
      return onPress()
    }
  }

  renderButton = () => (
    <Text style={styles.textStyle}>
      {this.props.children}
    </Text>
  )

  render() {
    const { style, disabled, fullWidth } = this.props
    return (
      <>
        {disabled ? (
          this.renderButton()
        ) : (
            <PlatformTouchable onPress={this.onPress} style={[styles.buttonStyle, style, fullWidth ? styles.fullWidth : ""]}>
              {this.renderButton()}
            </PlatformTouchable>
          )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center'
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: '#202646',
    borderRadius: 30,
    paddingHorizontal: 30,
    marginTop: 20
  },
  fullWidth: {
    width: width * 0.8
  }
})

export default Button