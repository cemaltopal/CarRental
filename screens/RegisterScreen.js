import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { userApi } from "../api/userApi";
import Toast from "react-native-toast-message";
import AppContext from "../store/AppContext";
import { MaskedTextInput } from "react-native-mask-text";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Alanını Doldurunuz")
      .email("Lütfen Geçerli Bir Email Adresi Giriniz")
      .label("Email"),
    password: Yup.string()
      .required()
      .min(4, "Sifrenin guvenli olması icin En Az 4 Karakter Olmalıdır")
      .label("Password"),
    confirmPassword: Yup.string()
      .required()
      .min(4)
      .label("Confirm Password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    phone: Yup.string().required().label("Phone Number"),
    address: Yup.string().required().label("Address"),
    zipCode: Yup.string().required().label("Zip Code"),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    zipCode: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);

      userApi
        .registerUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phoneNumber: values.phone,
          address: values.address,
          zipCode: values.zipCode,
        })
        .then((response) => {
          if (response === true) {
            Toast.show({
              type: "success",
              text1: "Register Successful",
            });
            navigation.navigate("LoginScreen");
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
    validationSchema,
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={formik.values.firstName}
        onChangeText={formik.handleChange("firstName")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />

      <HelperText type="error" visible={formik.errors.firstName}>
        {" "}
        {formik.errors.firstName}{" "}
      </HelperText>

      <TextInput
        placeholder="Last Name"
        value={formik.values.lastName}
        onChangeText={formik.handleChange("lastName")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.lastName}>
        {formik.errors.lastName}
      </HelperText>

      <TextInput
        placeholder="Phone number"
        value={formik.values.phone}
        onChangeText={formik.handleChange("phone")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
        render={(props) => (
          <MaskedTextInput
            {...props}
            value={formik.values.phone}
            mask="(999) 999-9999"
          />
        )}
      />
      <HelperText type="error" visible={formik.errors.phone}>
        {formik.errors.phone}
      </HelperText>

      <TextInput
        placeholder="Address"
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.address}>
        {formik.errors.address}
      </HelperText>

      <TextInput
        placeholder="Zip code"
        value={formik.values.zipCode}
        onChangeText={formik.handleChange("zipCode")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.zipCode}>
        {formik.errors.zipCode}
      </HelperText>

      <TextInput
        placeholder="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.email}>
        {formik.errors.email}
      </HelperText>

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />

      <HelperText type="error" visible={formik.errors.password}>
        {formik.errors.password}
      </HelperText>

      <TextInput
        placeholder="Password (Rentry)"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange("confirmPassword")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.confirmPassword}>
        {formik.errors.confirmPassword}
      </HelperText>

      <Button
        mode="contained"
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}
      >
        Register
      </Button>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: colors.color1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
