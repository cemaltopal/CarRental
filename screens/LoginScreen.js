import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { userApi } from "../api/userApi";
import Toast from "react-native-toast-message";
import AppContext from "../store/AppContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUserInformation } = useContext(AppContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await userApi.login(values.email, values.password);
      if (response === true) {
        Toast.show({
          type: "success",
          text1: "Login Successful",
        });

        const user = await userApi.getUserDetails();
        if (user) {
          console.log("USER: ", user);
          setUserInformation(user);
        }
        navigation.navigate("CarsScreen");
      } else {
        Toast.show({
          type: "error",
          text1: response,
        });
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ padding: 15, paddingTop: 40 }}>
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
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            style={{ marginTop: 15 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <HelperText type="error" visible={formik.errors.password}>
        {formik.errors.password}
      </HelperText>

      <Button
        mode="contained"
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={{ color: "black" }}>LOGIN</Text>
      </Button>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
        style={styles.registerText}
      >
        <Text>Click here if you want to create a new account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: colors.color1,
  },
  registerText: {
    marginTop: 20,
    alignItems: "center",
    cursor: "pointer",
  },
});
