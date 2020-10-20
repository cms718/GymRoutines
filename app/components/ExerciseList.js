import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Button,
} from "react-native";

export default function ExerciseList(props) {
  const { exercises, onRemoveSet, onAddSet, isWorkingOut } = props;
  // exercises is = to the object routine with e
  const Item = ({ name, sets, index }) => (
    <View>
      <View>
        <Text style={{ fontSize: 16, paddingBottom: 10 }}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Set</Text>
        <Text>Last Time</Text>
        <Text>Kg</Text>
        <Text>Reps</Text>
        {isWorkingOut && <Text> Done? </Text>}
      </View>
      <FlatList
        data={sets}
        renderItem={({ item }) => {
          return (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{item.num}</Text>
              <Text>---</Text>
              {/* make TextInputs = to value stored in item.reps & item.weight */}
              <TextInput style={styles.inputBox} />
              <TextInput style={styles.inputBox} />
              {isWorkingOut && (
                <TouchableOpacity>
                  <Text> ▢ </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 12 }}
      >
        <TouchableOpacity
          style={styles.changeSets}
          onPress={() => {
            onRemoveSet(index);
          }}
        >
          <Text style={styles.centerText}> - Remove Set </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeSets}
          onPress={() => {
            onAddSet(index);
          }}
        >
          <Text style={styles.centerText}> + Add Set </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <Item name={item.name} sets={item.sets} index={index} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  //need to make it a small box
  inputBox: { borderColor: "grey", borderWidth: 1 },
  changeSets: {},
  centerText: {},
});
