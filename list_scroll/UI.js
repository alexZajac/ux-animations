import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");
// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

const OFFSET = 200;

export default class FlatListUI extends React.Component {
  constructor(props) {
    super(props);
    this.items = this.props.items;

    this.state = {
      shouldAnimate: false,
      lastOffsetY: 0
    };
  }

  animateHandler = e => {
    const yOffset = e.nativeEvent.contentOffset.y;
    console.log(yOffset);
    this.setState({
      shouldAnimate: true,
      lastOffsetY: yOffset
    });
  };

  render() {
    const { shouldAnimate, lastOffsetY } = this.state;
    return (
      <ScrollView
        style={styles.flatlist}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={e => this.animateHandler(e)}
      >
        {this.items.map((_, i) => (
          <CardItemUI
            shouldAnimate={shouldAnimate}
            lastOffsetY={lastOffsetY}
            animateHandler={action => this.animateHandler(action)}
            offset={i * 50}
          />
        ))}
      </ScrollView>
    );
  }
}

class CardItemUI extends React.Component {
  constructor(props) {
    super(props);
    this.offset = this.props.offset;

    this.state = {
      animatedPosition: new Animated.Value(0),
      direction: "down",
      lastOffsetY: this.props.lastOffsetY
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.shouldAnimate) {
      prevState.animatedPosition.setValue(0);
      Animated.timing(prevState.animatedPosition, {
        toValue: 1,
        duration: 700,
        delay: nextProps.offset,
        easing: Easing.bezier(0.3, 0, 0.2, 1)
      }).start();
      return {
        direction:
          nextProps.lastOffsetY >= prevState.lastOffsetY ? "down" : "up"
      };
    }
  }

  render() {
    const { animatedPosition, direction } = this.state;
    const interpolatedPosition = animatedPosition.interpolate({
      inputRange: [0, 1],
      outputRange: direction === "down" ? [0, -50] : [-50, 0]
    });
    const animationStyles = {
      transform: [
        {
          translateY: interpolatedPosition
        }
      ]
    };

    return (
      <Animated.View style={[styles.item, animationStyles]}>
        <Card style={styles.card} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 0.12 * height,
    width: 0.72 * width,
    margin: 6
  },
  card: {
    flex: 1,
    backgroundColor: "#4A90E2"
  },
  flatlist: {
    width: 0.8 * width,
    backgroundColor: "#A0C3ED",
    marginTop: 20,
    alignItems: "center"
  }
});
