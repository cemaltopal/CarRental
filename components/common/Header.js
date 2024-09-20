import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import colors from "../../constants/colors";
import AppContext from "../../store/AppContext";

const Header = (props) => {
  const { searchActive, setSearchActive } = useContext(AppContext);

  const { navigation, route, options, back } = props;
  //console.log(props);
  return (
    <Appbar.Header style={{ backgroundColor: colors.color1 }}>
      <Appbar.BackAction
        onPress={() => {
          navigation.goBack();
        }}
        iconColor="white"
      />
      <Appbar.Content title={options.title} color="white" />
      {route.name === "CarsScreen" && (
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearchActive(!searchActive);
          }}
          iconColor="white"
        />
      )}
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});
