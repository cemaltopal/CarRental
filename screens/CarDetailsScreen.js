import { StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CarReservationForm from "../components/home/CarReservation";
import CarDetailsCard from "../components/common/CarDetails";
import { createContext } from "react";
import { PaperProvider } from "react-native-paper";

const CarReserveAndDetailScreen = ({ route }) => {
  const data = route.params.data;
  const {
    id,
    model,
    doors,
    seats,
    luggage,
    transmission,
    airConditioning,
    age,
    pricePerHour,
    fuelType,
    builtIn,
    image,
  } = data;

  console.log(airConditioning);

  // {
  //   "message": "string",
  //   "sucess": true
  // }

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <CarDetailsCard details={data} />

        <CarReservationForm data={data} />
      </ScrollView>
    </PaperProvider>
  );
};

export default CarReserveAndDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
