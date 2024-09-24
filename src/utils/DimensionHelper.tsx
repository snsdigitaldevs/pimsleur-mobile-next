import { Dimensions, NativeModules, Platform, StatusBar } from "react-native";
import DeviceInfo, { isTablet } from "react-native-device-info";

const UtilsModule = NativeModules.OneTrustModule;

// See https://mydevice.io/devices/ for device dimensions

const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;
export const IPAD_MIN_WIDTH = 768;
const IPADPRO_WIDTH = 1024;

export const IPHONEXS_WIDTH = 375;
export const IPHONESE_WIDTH = 320;
const IPHONEPLUS_WIDTH = 414;

const IPHONE5_HEIGHT = 568;
const IPHONE8_HEIGHT = 667;
const IPHONE8P_HEIGHT = 736; // 6plus/6splus/7plus/8plus

const IPHONEXS_HEIGHT = 812; // X/XS
const IPHONE_XS_MAX_HEIGHT = 896; // XSMax/XR
const IPHONE12_H = 844; // 12/12pro/13/13pro
const IPHONE12_Max = 926; // 12ProMax/13ProMax
const IPHONE12_Mini = 780; // 12mini/13mini

export const HOME_INDICATOR = 34;

export const BASE_WIDTH = 375;
const BASE_HEIGHT = IPHONEXS_HEIGHT;

// ipad mini 6th gen logic size
const TABLET_BASE_WIDTH = 744;
const TABLET_BASE_HEIGHT = 1133;

const iPhoneXScreenHeightList = [IPHONEXS_HEIGHT, IPHONE_XS_MAX_HEIGHT, IPHONE12_H, IPHONE12_Max, IPHONE12_Mini];

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get("window");

export const getScreenWidth = () => {
  if (Platform.OS === "ios") {
    let screenW = Dimensions.get("window").width;
    if (!screenW) {
      screenW = UtilsModule.screenWidth;
    }
    return screenW;
  }
  return D_WIDTH;
};

export const getScreenHeight = () => {
  if (Platform.OS === "ios") {
    let screenH = Dimensions.get("window").height;
    if (!screenH) {
      screenH = UtilsModule.screenHeight;
    }
    return screenH;
  }
  return D_HEIGHT;
};

export const isApplyIPadStyles = () => {
  return getScreenWidth() >= IPAD_MIN_WIDTH;
};

export const isApplyIPadProStyles = () => {
  return getScreenWidth() >= IPADPRO_WIDTH;
};

export const isApplySmallScreenStyles = () => {
  return getScreenWidth() <= BASE_WIDTH;
};

export const isIPhoneX = () => {
  if (Platform.OS !== "ios") {
    return false;
  }

  return (
    !Platform.isPad &&
    !Platform.isTV &&
    (iPhoneXScreenHeightList.indexOf(D_HEIGHT) >= 0 || iPhoneXScreenHeightList.indexOf(D_WIDTH) >= 0)
  );
};

export const isNewIPadPro = () => {
  if (Platform.OS !== "ios") {
    return false;
  }

  return (
    (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH) ||
    (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT) ||
    (D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) ||
    (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT)
  );
};

export const isAndroid = () => {
  return Platform.OS === "android";
};

const iPhoneModelsWithDynamicIsland = [
  "iPhone15,2",
  "iPhone15,3",
  "iPhone15,4",
  "iPhone15,5",
  "iPhone16,1",
  "iPhone16,2",
  "iPhone17,1",
  "iPhone17,2",
  "iPhone17,3",
  "iPhone17,4",
  "iPhone17,5",
];

export const isIPhoneWithDynamicIsland = () => {
  return Platform.OS === "ios" && iPhoneModelsWithDynamicIsland.indexOf(DeviceInfo.getDeviceId()) >= 0;
};

const safeAreaBottomInset = () => {
  if (Platform.OS === "ios") {
    return Number(UtilsModule.bottomInset);
  }
  return 0;
};

export const iPhoneWithNotch = () => {
  return isIPhoneWithDynamicIsland() || isIPhoneX() || safeAreaBottomInset() > 0;
};

export const statusBarHeight = () => {
  if (isIPhoneWithDynamicIsland()) {
    return 59;
  }
  if (isIPhoneX()) {
    return 44;
  }
  if (Platform.OS === "ios") {
    return 20;
  }
  if (Platform.OS === "android") {
    return StatusBar.currentHeight || 0;
  }
  return 0;
};

export const isDeviceInchSmallThanIPhone8P = () => {
  return D_HEIGHT <= IPHONE8P_HEIGHT && Platform.OS === "ios";
};

export const isDeviceInchSmallerThanIPhone5 = () => {
  return D_HEIGHT <= IPHONE5_HEIGHT;
};

export const isDeviceWidthLessThanIPhone5 = () => {
  return D_WIDTH <= IPHONESE_WIDTH;
};

export const navHeight = Platform.OS === "ios" ? 44 : 56;
export const tabBarHeight = 49;
export const iPhoneXHomeIndicatorHeight = iPhoneWithNotch() ? HOME_INDICATOR : 0;

export const getStatusBarAndNavigationHeight = () => {
  return statusBarHeight() + navHeight - (StatusBar.currentHeight || 0);
};
export const ratio = getScreenWidth() / BASE_WIDTH;
export const playerHeightForOtherLanguages = getScreenHeight() - (getStatusBarAndNavigationHeight() + 110) * ratio;

export const playerDefaultHeight = (isPlaying: boolean) => {
  return isPlaying
    ? (449 - getStatusBarAndNavigationHeight()) * ratio
    : (252 - getStatusBarAndNavigationHeight()) * ratio;
};

export const calculateFontSize = (size: number) => {
  if (getScreenWidth() <= IPHONESE_WIDTH) {
    return size * 0.8;
  }

  if (getScreenWidth() >= IPHONEPLUS_WIDTH) {
    return size * 1;
  }

  return size;
};

export const calculateMargin = (pt: number) => {
  if (pt <= IPHONESE_WIDTH) {
    return pt * 0.8;
  }

  if (getScreenWidth() >= IPHONEPLUS_WIDTH) {
    return pt * 1.1;
  }

  return pt;
};

export const getRem = (size: number) => size * (getScreenWidth() / (isTablet() ? TABLET_BASE_WIDTH : BASE_WIDTH));

export const getRemHeight = (size: number) =>
  size * (getScreenHeight() / (isTablet() ? TABLET_BASE_HEIGHT : BASE_HEIGHT));
