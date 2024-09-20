import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import colors from "../constants/colors";
import Car from "../components/home/Car";
import { Button, Searchbar } from "react-native-paper";
import AppContext from "../store/AppContext";

const CarsScreen = ({ navigation }) => {
  const [cars, setCars] = useState([
    {
      id: 0,
      model: "Audi Q5",
      doors: 5,
      seats: 4,
      luggage: 0,
      transmission: "Manuel",
      airConditioning: true,
      age: 0,
      pricePerHour: 60,
      fuelType: "Benzin",
      builtIn: true,
      image: [
        "https://carrental-v3-backend.herokuapp.com/files/display/4e1e497b-13d1-4d4f-b765-3d66763aba9e",
      ],
    },
    {
      id: 1,
      model: "Mercedes GLC",
      doors: 5,
      seats: 4,
      luggage: 0,
      transmission: "Automatic",
      airConditioning: false,
      age: 0,
      pricePerHour: 45,
      fuelType: "Diesel",
      builtIn: true,
      image: [
        "https://carrental-v3-backend.herokuapp.com/files/display/adfa72f1-3e38-4251-9ce0-7e25d00e7f9b",
      ],
    },
    {
      id: 2,
      model: "BMW X7",
      doors: 3,
      seats: 4,
      luggage: 0,
      transmission: "Automatic",
      airConditioning: true,
      age: 0,
      pricePerHour: 50,
      fuelType: "Diesel",
      builtIn: true,
      image: [
        "https://carrental-v3-backend.herokuapp.com/files/display/16022a7e-840f-447f-ab09-fcec24a74686",
      ],
    },
  ]);

  const { searchActive } = useContext(AppContext);
  const [filteredCars, setFilteredCars] = useState(cars);

  const handleSearch = (txt) => {
    if (txt.length >= 3) {
      const filtered = cars.filter((car) => {
        return car.model.toLowerCase().includes(txt.toLowerCase());
      });
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  };
  return (
    <View>
      {searchActive && (
        <Searchbar
          style={styles.searchBar}
          onChangeText={(txt) => {
            handleSearch(txt);
          }}
        />
      )}
      <FlatList
        data={filteredCars}
        renderItem={({ item }) => <Car data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
  },
});
export default CarsScreen;
