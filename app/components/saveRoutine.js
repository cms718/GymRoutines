import AsyncStorage from "@react-native-community/async-storage";

export default async function saveRoutine(name, note, routineExercises) {
  const getRoutines = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@gymRoutines");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
  const myRoutines = await getRoutines();

  const newRoutine = {
    name,
    note,
    id: Date.now(),
    routine: routineExercises,
  };
  const saveRoutine = async () => {
    if (myRoutines === null) {
      const firstRoutine = {
        routine: [newRoutine],
        profile: {},
      };
      try {
        const jsonRoutine = JSON.stringify(firstRoutine);
        await AsyncStorage.setItem("@gymRoutines", jsonRoutine);
        return firstRoutine;
      } catch (e) {
        console.log(e);
      }
    } else {
      myRoutines.routine.push(newRoutine);
      try {
        const jsonRoutine = JSON.stringify(myRoutines);
        await AsyncStorage.setItem("@gymRoutines", jsonRoutine);
        return myRoutines;
      } catch (e) {
        console.log(e);
      }
    }
  };
  const savedRoutines = await saveRoutine();
  return savedRoutines;

  // what do i want to do with data when pressed save - nav back to Routines Tab.
  // need a way for NewRoutine.js to know that save has been pressed and to call AsyncStorage.
}
