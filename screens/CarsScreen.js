import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import colors from "../constants/colors";
import Car from "../components/home/Car";
import { Button, Searchbar } from "react-native-paper";
import AppContext from "../store/AppContext";
import { carApi } from "../api/carApi";

const CarsListScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);

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

  //https://carrental-v3-backend.herokuapp.com/files/display/7aed73f7-e3f3-48b7-8235-f61c89fea30b
  useEffect(() => {
    //fonksyonun cagrilmasi
    const fetchCarData = async () => {
      carApi
        .listAllCars()
        .then((carList) => {
          if (carList) {
            let newCarList = carList.map((car) => {
              let imageArray = car.image.map((imageItem) => {
                imageItem = `https://carrental-v3-backend.herokuapp.com/files/display/${imageItem}`;
                return imageItem;
              });
              car.image = imageArray;
              return car;
            });

            setCars(newCarList);
            setFilteredCars(newCarList);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCarData();
  }, []);

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
export default CarsListScreen;
