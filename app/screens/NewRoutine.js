import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  Modal,
  FlatList,
} from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

import ExerciseList from "../components/ExerciseList";
import saveRoutine from "../components/saveRoutine";

export const exerciseList = [
  {
    name: "Bench Press",
    id: 1,
    body_parts: ["Chest", "Tricep"],
    description: "",
    sets: [
      {
        num: 1,
        previous: "",
        weight: "",
        reps: "",
        id: 1.1,
      },
    ],
  },
  {
    name: "Squat",
    id: 2,
    body_parts: ["Legs"],
    description: "",
    sets: [
      {
        num: 1,
        previous: "",
        weight: "",
        reps: "",
        id: 2.1,
      },
    ],
  },
  {
    name: "Bent Over Row",
    id: 3,
    body_parts: ["Back", "Biceps"],
    description: "",
    sets: [
      {
        num: 1,
        previous: "",
        weight: "",
        reps: "",
        id: 3.1,
      },
    ],
  },
];

export default function NewRoutine({ navigation, route }) {
  //save button - nav from stackscreen components
  const [exercisesVisible, setExercisesVisible] = useState(false);
  const [exercisesSelected, setExercisesSelected] = useState([]);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [note, setNote] = useState("Set Notes");
  const [name, setName] = useState("Routine Name");
  const [isWorkingOut, setIsWorkingOut] = useState(false);

  const routineData = route.params;

  {
    routineData &&
      useEffect(() => {
        setName(routineData.name);
        setNote(routineData.note);
        setRoutineExercises(routineData.routine);
        setIsWorkingOut(true);
      });
  }

  {
    !routineData &&
      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
              onPress={async () => {
                await saveRoutine(name, note, routineExercises);
                navigation.navigate("My Routines");
              }}
              title="Save"
            />
          ),
        });
      }, [navigation, name, note, routineExercises]);
  }

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = exercisesSelected.includes(item)
      ? "yellow"
      : "white";
    return (
      <Item
        item={item}
        onPress={() => {
          if (exercisesSelected.includes(item)) {
            const exercisesDeselected = exercisesSelected.filter(
              (exercise) => exercise !== item
            );
            setExercisesSelected(exercisesDeselected);
          } else {
            setExercisesSelected([...exercisesSelected, item]);
          }
        }}
        style={{ backgroundColor }}
      />
    );
  };
  //seperator for item list
  const renderSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "grey",
        }}
      />
    );
  };

  const addExercises = () => {
    const newExercises = routineExercises.concat(exercisesSelected);
    setRoutineExercises(newExercises);
    setExercisesSelected([]);
    setExercisesVisible(false);
  };

  const handleRemove = (exerciseIndex) => {
    // Take set, find in routineExercises, remove, re-set routineExercises
    const newExercises = [...routineExercises];
    newExercises[exerciseIndex].sets.pop();
    setRoutineExercises(newExercises);
  };

  // finding the last set id and adding 0.1
  const handleAdd = (exerciseIndex) => {
    const newExercises = [...routineExercises];
    const lastSet = newExercises[exerciseIndex].sets.slice(-1)[0];
    const newId =
      lastSet === undefined ? exerciseIndex + 1.1 : lastSet.id + 0.1;
    const newNum = lastSet === undefined ? 1 : lastSet.num + 1;

    const newSet = {
      id: newId,
      num: newNum,
      previous: "",
      weight: "",
      reps: "",
    };
    newExercises[exerciseIndex].sets.push(newSet);
    setRoutineExercises(newExercises);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={(styles.textinput, { fontSize: 12 }, { padding: 12 })}
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <ExerciseList
        exercises={routineExercises}
        onRemoveSet={handleRemove}
        onAddSet={handleAdd}
        isWorkingOut={isWorkingOut}
      />
      {!routineData && (
        <Button
          title="Add Exercise"
          onPress={() => {
            setExercisesVisible(true);
          }}
        />
      )}
      {routineData && (
        <Button
          title="Finish Workout"
          onPress={() => {
            console.log(routineData);
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={exercisesVisible}
        onRequestClose={() => {}}
      >
        <SafeAreaView style={styles.modalView}>
          {/* header for modal */}
          <View style={styles.modalHeader}>
            <TouchableHighlight
              onPress={() => {
                setExercisesSelected([]);
                setExercisesVisible(false);
              }}
            >
              <Text> X </Text>
            </TouchableHighlight>
            <Text style={{ flexGrow: 0.5 }}> Select Exercises</Text>
          </View>
          {/* sort exercise list to display in alphabetical / sort by body part */}
          {/* FlatList display of available exercises */}
          <SafeAreaView>
            <FlatList
              data={exerciseList}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              extraData={exercisesSelected}
              ItemSeparatorComponent={renderSeparatorView}
            />
          </SafeAreaView>
          <View style={styles.addExercise}>
            <Button title="Add Exercises" onPress={addExercises} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textinput: {
    height: 30,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  modalView: {
    flex: 0.9,
    marginTop: 105,
    flexDirection: "column",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  addExercise: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    marginBottom: 8,
    left: 0,
    right: 0,
  },
  item: {
    flex: 1,
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  pressed: {
    flex: 1,
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: "gray",
  },
});
