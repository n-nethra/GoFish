import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./home";
import Apartments from "./apartments";
import Roommates from "./roommates";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Apartments" component={Apartments} />
        <Stack.Screen name="Roommates" component={Roommates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}