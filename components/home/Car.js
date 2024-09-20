import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Title, Paragraph, IconButton, Icon } from "react-native-paper";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Car = ({ data }) => {
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

  const navigation = useNavigation();
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{
          uri: image[0],
        }}
      />
      <Card.Content style={styles.cardContent}>
        <View>
          <Title style={styles.title}>{model}</Title>
          <Paragraph style={styles.paragraph}>
            from ${pricePerHour} / hour
          </Paragraph>
        </View>
        <IconButton
          icon="chevron-right"
          iconColor="white"
          size={40}
          style={{ backgroundColor: colors.color1 }}
          onPress={() => navigation.navigate("CarDetails", { data })}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    borderRadius: 30,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  paragraph: {
    color: colors.color1,
    fontStyle: "italic",
  },
});

export default Car;
