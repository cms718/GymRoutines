import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
export default function RoutinesList({ navigation }) {
  const getRoutines = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@gymRoutines");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const [routines, setRoutines] = useState();
  const [routinePressed, setRoutinePressed] = useState(false);
  const [routineData, setRoutineData] = useState();

  // eventually use Redux instead
  // currently doesnt update on adding routines or deleting. need to change the state.
  // updates when one of the values in the dependency array changes
  useEffect(() => {
    const fetchAndSetRoutines = async () => {
      const fetchedRoutines = await getRoutines();
      setRoutines(fetchedRoutines);
    };
    fetchAndSetRoutines();
  }, []);

  return (
    <View style={styles.container}>
      {routines && (
        <FlatList
          data={routines.routine}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setRoutinePressed(true);
                  setRoutineData({ item });
                }}
                style={styles.item}
              >
                <Text style={styles.centerText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
      {routineData && (
        <Modal
          animationType="fade"
          transparent={false}
          visible={routinePressed}
          onRequestClose={() => {}}
        >
          <SafeAreaView styles={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.textHeader}>{routineData.item.name}</Text>
            </View>
            <FlatList
              data={routineData.item.routine}
              renderItem={({ item }) => {
                return <Text style={styles.exerciseText}>{item.name}</Text>;
              }}
              keyExtractor={(item) => `${item.id}`}
            />
            <View style={styles.modalFooter}>
              <Button
                title="Start Workout!"
                style={{}}
                onPress={() => {
                  navigation.navigate("New Routine", routineData.item);
                  setRoutinePressed(false);
                }}
              />
              <Button
                title="Close"
                onPress={() => {
                  setRoutinePressed(false);
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  item: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "black",
    margin: 10,
    padding: 20,
    backgroundColor: "azure",
  },
  centerText: {
    alignSelf: "center",
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
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  textHeader: {
    fontSize: 20,
    padding: 20,
  },
  exerciseText: {
    alignSelf: "center",
    padding: 20,
    fontSize: 18,
  },
  modalFooter: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
