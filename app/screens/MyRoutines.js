import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "react-native";
import RoutinesList from "../components/RoutinesList";
import AsyncStorage from "@react-native-community/async-storage";

export default function MyRoutines({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 18, alignSelf: "center", padding: 12 }}>
          Routines
        </Text>
        <RoutinesList navigation={navigation} />
        <Button
          title="Add new routine"
          onPress={() => navigation.navigate("New Routine")}
        />
        <Button
          title="Clear Routines"
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("@gymRoutines");
              console.log("done");
            } catch (e) {
              // remove error
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
