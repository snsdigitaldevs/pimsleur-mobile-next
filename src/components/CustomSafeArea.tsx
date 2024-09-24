import * as React from "react";
import { StatusBar, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  iPhoneXHomeIndicatorHeight,
  navHeight,
  statusBarHeight,
  tabBarHeight,
} from "../utils/DimensionHelper";

interface ICustomSafeAreaProps {
  withNavigation?: boolean;
  withTabBar?: boolean;
  withStatusBar?: boolean;
  withHomeIndicatorForIphoneX?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  basic: {
    flex: 1,
  },
});

const getPadding = (
  withNavigation: boolean,
  withTabBar: boolean,
  withHomeIndicatorForIphoneX: boolean,
  withStatusBar: boolean,
) => {
  return {
    // delete android status bar height if necessary
    paddingTop:
      (withStatusBar ? statusBarHeight() : 0) + (withNavigation ? navHeight : 0) - (StatusBar.currentHeight || 0),
    paddingBottom: (withTabBar ? tabBarHeight : 0) + (withHomeIndicatorForIphoneX ? iPhoneXHomeIndicatorHeight : 0),
  };
};

export const CustomSafeArea = ({
  withStatusBar = true,
  withNavigation = false,
  withTabBar = false,
  withHomeIndicatorForIphoneX = true,
  customStyle = {},
  children,
}: ICustomSafeAreaProps) => {
  return (
    <View
      style={[
        styles.basic,
        getPadding(withNavigation, withTabBar, withHomeIndicatorForIphoneX, withStatusBar),
        customStyle,
      ]}
    >
      {children}
    </View>
  );
};
