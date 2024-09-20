import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
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
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <View style={{ padding: 15, paddingTop: 40 }}>
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
      >
        Register
      </Button>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: colors.color1,
  },
});
