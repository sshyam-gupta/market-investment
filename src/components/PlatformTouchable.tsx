import _ from 'lodash'
import React, { Component } from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

let TouchableComponent: any

TouchableComponent =
  Platform.OS === 'android' ? (Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback) : TouchableOpacity

if (TouchableComponent !== TouchableNativeFeedback) {
  TouchableComponent.SelectableBackground = () => ({})
  TouchableComponent.SelectableBackgroundBorderless = () => ({})
  TouchableComponent.Ripple = () => ({})
  TouchableComponent.canUseNativeForeground = () => false
}

export interface PlatformTouchableProps {
  onPress: () => any
  debounceTime?: number
  fallback?: number
  style?: any
  foreground?: any
  background?: any
  useForeground?: any
  disabled?: boolean
}

export interface PlatformTouchableState {
  action: () => any
}

export default class PlatformTouchable extends Component<PlatformTouchableProps, PlatformTouchableState> {
  static SelectableBackground = TouchableComponent.SelectableBackground
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless
  static Ripple = TouchableComponent.Ripple
  static canUseNativeForeground = TouchableComponent.canUseNativeForeground
  buttonAction = _.noop

  constructor(props: PlatformTouchableProps) {
    super(props)
    this.updateDebounce(props)

    this.state = {
      action: props.onPress
    }
  }

  updateDebounce(props: PlatformTouchableProps) {
    const debounceTime = props.debounceTime ? props.debounceTime : 400
    this.buttonAction = _.noop
    this.buttonAction = _.debounce(this.actionInitiate, debounceTime, {
      leading: true,
      trailing: false
    })
  }

  static getDerivedStateFromProps(nextProps: PlatformTouchableProps, prevState: PlatformTouchableState) {
    if (nextProps.onPress !== prevState.action) {
      return {
        action: nextProps.onPress
      }
    }
    return null
  }

  actionInitiate = () => {
    if (this.state.action) this.state.action()
  }

  componentWillUnmount() {
    this.buttonAction = _.noop
  }

  render() {
    let { children, useForeground } = this.props
    const { style, foreground, background } = this.props
    children = React.Children.only(children)

    const eventHandlers = Platform.OS === 'web' ? { onClick: this.buttonAction } : { onPress: this.buttonAction }

    const props = _.omit(this.props, ['onClick', 'onPress'])

    if (TouchableComponent === TouchableNativeFeedback) {
      useForeground = foreground && TouchableNativeFeedback.canUseNativeForeground()

      if (foreground && background) {
        console.warn(
          'Specified foreground and background for Touchable, only one can be used at a time. Defaulted to foreground.'
        )
      }

      return (
        <TouchableComponent
          {...props}
          {...eventHandlers}
          useForeground={useForeground}
          background={(useForeground && foreground) || background}
        >
          <View style={style}>{children}</View>
        </TouchableComponent>
      )
    } else if (TouchableComponent === TouchableWithoutFeedback) {
      return (
        <TouchableWithoutFeedback {...props} {...eventHandlers}>
          <View style={style}>{children}</View>
        </TouchableWithoutFeedback>
      )
    } else {
      const TouchableFallback = this.props.fallback || TouchableComponent
      return (
        <TouchableFallback activeOpacity={0.65} {...props} {...eventHandlers} style={style}>
          {children}
        </TouchableFallback>
      )
    }
  }
}
