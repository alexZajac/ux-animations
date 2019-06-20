import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");
// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

export default class CardItemUI extends React.Component {
  constructor(props) {
    super(props);
    this.opacityAnim = new Animated.Value(0);
    this.positionAnim = new Animated.Value(0);

    this.offset = this.props.offset;
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    Animated.parallel([
      Animated.timing(this.opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: this.offset,
        easing: Easing.bezier(0.5, 0, 0.5, 1)
      }),
      Animated.timing(this.positionAnim, {
        toValue: 1,
        duration: 250,
        delay: this.offset,
        easing: Easing.bezier(0.5, 0, 0.5, 1)
      })
    ]).start();
  };

  render() {
    const interpolatedTranslation = this.positionAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });
    const animatedStyles = {
      opacity: this.opacityAnim,
      transform: [
        {
          translateY: interpolatedTranslation
        }
      ]
    };
    return (
      <Animated.View style={[styles.item, animatedStyles]}>
        <Card style={styles.card} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: width / 3.3,
    borderRadius: 20
  },
  card: {
    flex: 1,
    backgroundColor: "#A0C3ED",
    borderRadius: 10
  }
});
