import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import posed from "react-native-pose";

const { width, height } = Dimensions.get("window");

const items = new Array(7).fill({});

const OverView = posed.View({
  open: {
    opacity: 1,
    staggerChildren: 25
  },
  closed: {
    opacity: 0.99,
    staggerChildren: 25,
    delayChildren: 150,
    staggerDirection: -1
  }
});

const CardView = posed.View({
  open: {
    x: 0.6 * width,
    transition: {
      duration: 400,
      type: "spring",
      stiffness: 80
    }
  },
  closed: {
    x: 0,
    transition: {
      duration: 300
    }
  }
});

const MenuView = posed.View({
  open: {
    x: 0,
    staggerChildren: 35,
    delayChildren: 300,
    transition: {
      duration: 350
    }
  },
  closed: {
    x: -width * 0.6,
    staggerChildren: 25,
    delay: 150,
    staggerDirection: -1,
    transition: {
      duration: 300
    }
  }
});

const ItemView = posed.View({
  open: {
    x: 0,
    transition: {
      duration: 300
    }
  },
  closed: {
    x: -0.6 * width,
    transition: {
      duration: 300
    }
  }
});

const MenuComponent = props => (
  <MenuView pose={props.isOpen ? "open" : "closed"} style={styles.menu}>
    {items.map((_, i) => (
      <ItemView
        pose={props.isOpen ? "open" : "closed"}
        style={[styles.shortLine, { marginBottom: 40 }]}
      />
    ))}
  </MenuView>
);

const CardItem = props => (
  <CardView
    pose={props.isOpen ? "open" : "closed"}
    style={styles.cardContainer}
  >
    <View style={styles.circle} />
    <View style={styles.lineContainer}>
      <View style={styles.longLine} />
      <View style={styles.shortLine} />
      <View style={styles.shortLine} />
    </View>
  </CardView>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this._drawer = {};
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    setInterval(
      () => this.setState(prevState => ({ isOpen: !prevState.isOpen })),
      3000
    );
  }

  render() {
    const { isOpen } = this.state;
    return (
      <OverView pose={isOpen ? "open" : "closed"} style={styles.container}>
        {items.map(_ => (
          <CardItem isOpen={isOpen} />
        ))}
        <MenuComponent isOpen={isOpen} />
      </OverView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEECFB"
  },
  cardContainer: {
    height: 0.12 * height,
    width: 0.94 * width,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#7AB3EF",
    margin: 5
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#BEDAF7",
    margin: 20
  },
  lineContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  longLine: {
    height: 10,
    width: 0.6 * width,
    borderRadius: 10,
    backgroundColor: "#BEDAF7",
    marginBottom: 5
  },
  shortLine: {
    height: 10,
    width: 0.4 * width,
    borderRadius: 10,
    backgroundColor: "#BEDAF7",
    marginTop: 5,
    marginBottom: 5
  },
  menu: {
    backgroundColor: "#0077C0",
    position: "absolute",
    width: 0.6 * width,
    height: height,
    left: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0.12 * height
  }
});
