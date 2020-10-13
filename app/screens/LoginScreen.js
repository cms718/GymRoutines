import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const handleLogin = () => {};
  return (
    <ImageBackground
      source={require("../assets/park.png")}
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.text}> real cofee </Text>
      </View>
      {/* <View style={styles.loginButton}> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.centerText}> Login </Text>
      </TouchableOpacity>
      {/* </View> */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.centerText}> Register </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "red",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
  },
  text: {
    padding: 30,
    fontSize: 36,
  },
  centerText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});

// testing buttons with alerts - Alert.prompt is same but takes callback function
// const handleButton = () => {
//   Alert.alert("Title", "Message", [
//     {
//       text: "Yes",
//       onPress: () => console.log("yes"),
//     },
//     { text: "No", onPress: () => console.log("no") },
//   ]);
// };
// <Button title="Test Alerts" onPress={handleButton} />
