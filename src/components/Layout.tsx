import React from "react";
import { View } from "react-native";

const Layout: React.FunctionComponent = ({ children, ...props }) => (
  <View {...props} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </View>
)

export default Layout;