import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "react-native";

export default function MyRoutines({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 18 }}>Routines</Text>
        <Button
          title="Add new routine"
          onPress={() => navigation.navigate("New Routine")}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
