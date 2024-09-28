import { StyleSheet, Text, View } from "react-native";
import React, { createContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarReserveAndDetailScreen from "../CarDetailsScreen";
import ReservationResultScreen from "../ReservationResultScreen";
import colors from "../../constants/colors";
import Header from "../../components/common/Header";
import CarsListScreen from "../CarsScreen";
import PaymentScreen from "../PaymentScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";

const HomeStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register",
        }}
      />

      <Stack.Screen
        name="CarsScreen"
        component={CarsListScreen}
        options={{
          title: "Select a Car",
          headerStyle: { backgroundColor: colors.color1 },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CarDetails"
        component={CarReserveAndDetailScreen}
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
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: "Credit Card Payment",
          headerStyle: { backgroundColor: colors.color1 },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
