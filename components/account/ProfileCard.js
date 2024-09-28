import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext } from "react";
import {
  Avatar,
  Card,
  Paragraph,
  Title,
  Button,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../store/AppContext";

const ProfileCard = ({ page }) => {
  const { userInformation } = useContext(AppContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("LoginScreen");
        },
      },
    ]);
    return;
  };

  return (
    <Card>
      <Card.Content style={styles.content}>
        <Avatar.Icon size={100} icon="account-circle" color="gray" />
        <Title style={styles.title}>
          {userInformation.firstName} {userInformation.lastName}
        </Title>
        <Paragraph>{userInformation.email}</Paragraph>

        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "space-between",
            flexDirection: "row",
          }}
        >
          <Button
            textColor={page === "profile" ? "green" : "black"}
            style={styles.button}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            PROFILE
          </Button>
          <Button
            textColor={page === "password" ? "green" : "black"}
            style={styles.button}
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            PASSWORD
          </Button>
          <Button
            textColor={page === "reservations" ? "green" : "black"}
            style={styles.button}
            onPress={() => navigation.navigate("ReservationsScreen")}
          >
            RESERVATIONS
          </Button>
        </View>

        <IconButton
          icon="logout"
          style={styles.logout}
          iconColor="white"
          onPress={handleLogout}
        />
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  button: {
    margin: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  logout: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "gray",
  },
});
