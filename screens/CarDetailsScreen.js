import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import colors from "../constants/colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import sizes from "../constants/sizes";
import CarReservation from "../components/home/CarReservation";

const CarDetailsScreen = ({ route }) => {
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

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: image[0],
          }}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.title}>{model}</Title>

          <Text>
            <Icon name="car-door" size={24} color={colors.color1} /> {doors}{" "}
            doors | <Icon name="car-seat" size={24} color={colors.color1} />{" "}
            {seats} seats
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>${pricePerHour} / hour</Text>
          </TouchableOpacity>

          <View style={styles.icons}>
            <View>
              <Icon
                name="car-shift-pattern"
                size={sizes.carDetailIconSize}
                color={colors.color1}
              />
              <Text>{transmission}</Text>
            </View>

            {airConditioning && (
              <View>
                <Icon
                  name="snowflake"
                  size={sizes.carDetailIconSize}
                  color={colors.color1}
                />
                <Text>Air Cond</Text>
              </View>
            )}

            <View>
              <Icon
                name="gas-station"
                size={sizes.carDetailIconSize}
                color={colors.color1}
              />
              <Text>{fuelType}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <CarReservation />
    </ScrollView>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    marginTop: 20,
    paddingBottom: 20,
  },
  button: {
    marginTop: 25,
    width: "100%",
    backgroundColor: colors.color4,
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  icons: {
    marginTop: 25,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateTimeButton: {
    borderRadius: 5,
    padding: 10,
  },
});
