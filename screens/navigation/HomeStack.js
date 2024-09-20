import { StyleSheet, Text, View } from "react-native";
import React, { createContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarsScreen from "../CarsScreen";
import CarDetailsScreen from "../CarDetailsScreen";
import ReservationResultScreen from "../ReservationResultScreen";
import colors from "../../constants/colors";
import Header from "../../components/common/Header";

const HomeStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="CarsScreen"
        component={CarsScreen}
        options={{
          title: "Select a Car",
          headerStyle: { backgroundColor: colors.color1 },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CarDetails"
        component={CarDetailsScreen}
        options={{
          title: "Car Details",
          headerStyle: { backgroundColor: colors.color1 },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ReservationResultScreen"
        component={ReservationResultScreen}
        options={{
          title: "Reservation Result",
          headerStyle: { backgroundColor: colors.color1 },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
