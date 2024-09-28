import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CarDetailsCard from "../components/common/CarDetails";
import { List, MD3Colors } from "react-native-paper";
import colors from "../constants/colors";
import dateTimeFormatter from "../components/common/dateTimeFormatter";

const ReservationDetailsScreen = ({ route }) => {
  const reservation = route.params.reservation;
  console.log(reservation);

  return (
    <ScrollView>
      <CarDetailsCard details={reservation.car} />
      <List.Item
        title="Pickup Location"
        titleStyle={{ fontWeight: "bold" }}
        description={reservation.pickUpLocation}
        left={(props) => (
          <List.Icon {...props} icon="map-marker-plus" color={colors.color1} />
        )}
      />
      <List.Item
        title="Dropoff Location"
        titleStyle={{ fontWeight: "bold" }}
        description={reservation.dropOffLocation}
        left={(props) => (
          <List.Icon {...props} icon="map-marker-minus" color={colors.color1} />
        )}
      />
      <List.Item
        title="Pickup Date"
        titleStyle={{ fontWeight: "bold" }}
        description={dateTimeFormatter(reservation.pickUpTime)}
        left={(props) => (
          <List.Icon {...props} icon="calendar-month" color={colors.color1} />
        )}
      />
      <List.Item
        title="Dropoff Date"
        titleStyle={{ fontWeight: "bold" }}
        description={dateTimeFormatter(reservation.dropOffTime)}
        left={(props) => (
          <List.Icon {...props} icon="calendar-month" color={colors.color1} />
        )}
      />
    </ScrollView>
  );
};

export default ReservationDetailsScreen;

const styles = StyleSheet.create({});
