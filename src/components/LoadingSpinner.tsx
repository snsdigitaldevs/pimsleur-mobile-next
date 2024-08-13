import * as React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface ILoadingCircleProps {
  content: React.ReactNode;
}

export class LoadingSpinner extends React.Component<ILoadingCircleProps> {
  private stopAnimation = false;
  state = {
    degree: new Animated.Value(0),
  };

  componentDidMount() {
    this.animateProgress();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.stopAnimation = true;
  }

  animateProgress() {
    this.state.degree.setValue(0);
    Animated.timing(this.state.degree, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true, // <-- Add this
    }).start(() => {
      // We have to stop infinite animation looping here, otherwise we can not render pdf correctly
      // See https://github.com/wonday/react-native-pdf/issues/108 for more details/
      if (!this.stopAnimation) {
        this.animateProgress();
      }
    });
  }

  render() {
    const degree = this.state.degree.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={styles.progress}>
        <Animated.View
          style={{
            transform: [
              { rotate: degree },
              { perspective: 1000 }, // without this line this Animation will not render on Android
            ],
          }}
        >
          {this.props.content}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    alignItems: "center",
    justifyContent: "center",
  },
});
