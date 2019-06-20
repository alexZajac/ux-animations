import * as React from "react";
import { View, StyleSheet } from "react-native";
import FlatListUI from "./UI";

export default class Demo extends React.Component {
  render() {
    const items = new Array(30).fill({});
    return (
      <View style={styles.container}>
        <FlatListUI items={items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
