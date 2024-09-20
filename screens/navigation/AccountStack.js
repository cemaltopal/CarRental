import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../ProfileScreen";
import ChangePasswordScreen from "../ChangePasswordScreen";
import ReservationsScreen from "../ReservationsScreen";
import ReservationDetailsScreen from "../ReservationDetailsScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import Header from "../../components/common/Header";

const AccountStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="ReservationsScreen"
        component={ReservationsScreen}
        options={{
          title: "Reservations",
        }}
      />
      <Stack.Screen
        name="ReservationDetailsScreen"
        component={ReservationDetailsScreen}
        options={{
          title: "Reservation Details",
        }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register",
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

const styles = StyleSheet.create({});
