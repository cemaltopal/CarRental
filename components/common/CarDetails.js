import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";

const CarDetailsCard = ({ details }) => {
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
  } = details;

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{
          uri: image[0],
        }}
      />
      <Card.Content style={styles.cardContent}>
        <Title style={styles.title}>{model}</Title>

        <Text>
          <Icon name="car-door" size={24} color={colors.color1} /> {doors} doors
          | <Icon name="car-seat" size={24} color={colors.color1} /> {seats}{" "}
          seats
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
  );
};

export default CarDetailsCard;

const styles = StyleSheet.create({
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
});
