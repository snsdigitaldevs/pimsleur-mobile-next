import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

interface IPageBackgroundImageProps {
  source?: ImageSourcePropType;
}

export const BackgroundImageView = ({
  source = require("../assets/bg.png"),
}: IPageBackgroundImageProps) => {
  return <Image source={source} style={styles.backgroundImg} />;
};

const styles = StyleSheet.create({
  backgroundImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
});
