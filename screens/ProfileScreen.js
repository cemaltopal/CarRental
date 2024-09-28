import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext } from "react";
import ProfileCard from "../components/account/ProfileCard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, HelperText, Button } from "react-native-paper";
import colors from "../constants/colors";
import sizes from "../constants/sizes";
import { userApi } from "../api/userApi";
import AppContext from "../store/AppContext";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const { userInformation, setUserInformation } = useContext(AppContext);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    phone: Yup.string().required().label("Phone Number"),
    address: Yup.string().required().label("Address"),
    zip: Yup.string().required().label("Zip Code"),
  });

  let initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    zip: "",
  };

  useEffect(() => {
    initialValues = {
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      phone: userInformation.phoneNumber,
      address: userInformation.address,
      zip: userInformation.zipCode,
    };
    formik.setFieldValue("firstName", userInformation.firstName);
    formik.setFieldValue("lastName", userInformation.lastName);
    formik.setFieldValue("phone", userInformation.phoneNumber);
    formik.setFieldValue("address", userInformation.address);
    formik.setFieldValue("zip", userInformation.zipCode);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      //update user details burada cagrılacak
      userApi
        .updateUserDetails({
          firstName: values.firstName,
          lastName: values.lastName,
          email: userInformation.email,
          phoneNumber: values.phone,
          address: values.address,
          zipCode: values.zip,
        })
        .then((response) => {
          if (response === true) {
            Toast.show({
              type: "success",
              text1: "Profile Updated!",
            });
            setUserInformation({
              ...userInformation,
              firstName: values.firstName,
              lastName: values.lastName,
            });
          } else {
            Toast.show({
              type: "error",
              text1: response,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <ScrollView style={styles.container}>
      <ProfileCard page={"profile"} style={styles.card} />

      <TextInput
        label="First Name"
        value={formik.values.firstName}
        onChangeText={formik.handleChange("firstName")}
        style={{ ...styles.textInput, marginTop: 20 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />

      <HelperText
        type="error"
        visible={formik.errors.firstName}
        style={{ marginHorizontal: 20 }}
      >
        {" "}
        {formik.errors.firstName}{" "}
      </HelperText>

      <TextInput
        label="Last Name"
        value={formik.values.lastName}
        onChangeText={formik.handleChange("lastName")}
        style={styles.textInput}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText
        type="error"
        visible={formik.errors.lastName}
        style={{ marginHorizontal: 20 }}
      >
        {formik.errors.lastName}
      </HelperText>

      <TextInput
        label="Phone number"
        value={formik.values.phone}
        onChangeText={formik.handleChange("phone")}
        style={styles.textInput}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
        keyboardType="numeric"
      />
      <HelperText
        type="error"
        visible={formik.errors.phone}
        style={{ marginHorizontal: 20 }}
      >
        {formik.errors.phone}
      </HelperText>

      <TextInput
        label="Address"
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
        style={styles.textInput}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText
        type="error"
        visible={formik.errors.address}
        style={{ marginHorizontal: 20 }}
      >
        {formik.errors.address}
      </HelperText>

      <TextInput
        label="Zip code"
        value={formik.values.zip}
        onChangeText={formik.handleChange("zip")}
        style={styles.textInput}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText
        type="error"
        visible={formik.errors.zipCode}
        style={{ marginHorizontal: 20 }}
      >
        {formik.errors.zipCode}
      </HelperText>

      <Button
        mode="contained"
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}
      >
        SAVE CHANGES
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.containerPadding,
  },
  card: {
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    marginHorizontal: 20,
  },
  button: {
    margin: 20,
    marginTop: 5,
    backgroundColor: colors.color1,
  },
});
