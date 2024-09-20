import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "../AboutScreen";
import Header from "../../components/common/Header";

const AboutStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ title: "About" }}
      />
    </Stack.Navigator>
  );
};

export default AboutStack;

const styles = StyleSheet.create({});
