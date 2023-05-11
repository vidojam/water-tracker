import { useState, useEffect } from "react"
import { NativeBaseProvider, Box, Toast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Title from "./src/components/Title";
import Goals from "./src/components/Goal";
import Tracker from "./src/components/Tracker";
import Controls from "./src/components/Controls";

export default function App() {

  const [intake, setIntake] = useState(0);
  const {goal, setGoal} = useState(2500);

  const getPreviousIntake = async () => {
    const value = await AsyncStorage.getItem('@storage_key');
    if(value) {
      setIntake(JSON.parse(value));
    }
  }

  const setPreviousIntake = async () => {
    await AsyncStorage.setItem("@storage_key", JSON.stringify (intake));
  }

  useEffect(() => {
    getPreviousIntake();
  }, [])

  useEffect(() => {
    if (intake >= goal) {
      Toast.show({
        title: "Hooray",
        description:"You met your water intake goal",
        bg: "blue.400",
        w:360,
        h:90,
        p: 16,
      })
    }
  }, [intake]) // runs once & cause a secondary thing to happen

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#151926" alignItems="center" justifyContent="flex-start">
        <Box height={50} width="100%" bg="#29313c"></Box>
        <Title />
        <Goals goal={goal}/>
        <Tracker intake={intake} goal={goal}/>
        <Controls intake={intake} setIntake={setIntake} />
      </Box>
    </NativeBaseProvider>
  );
}
