import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import ProfileCard from "../components/account/ProfileCard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, HelperText, Button } from "react-native-paper";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import sizes from "../constants/sizes";
import { userApi } from "../api/userApi";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const initialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      userApi
        .updateUserPassword({
          oldPassword: values.currentPassword,
          newPassword: values.password,
        })
        .then((response) => {
          if (response === true) {
            Toast.show({
              type: "success",
              text1: "Password Changed Successfully",
            });
          } else {
            Toast.show({
              type: "error",
              text1: response,
            });
          }
        });
    },
  });

  const [secureCurrentPassword, setSecureCurrentPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <ProfileCard page={"password"} />

      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Current Password"
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange("currentPassword")}
          style={{ padding: 5 }}
          activeUnderlineColor={colors.color1}
          underlineColor="gray"
          secureTextEntry={secureCurrentPassword}
          right={
            <TextInput.Icon
              icon={secureCurrentPassword ? "eye" : "eye-off"}
              onPress={() => setSecureCurrentPassword(!secureCurrentPassword)}
            />
          }
        />

        <HelperText type="error" visible={formik.errors.password}>
          {formik.errors.password}
        </HelperText>

        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          backgroundColor={colors.color7}
          style={{ padding: 5 }}
          activeUnderlineColor={colors.color1}
          underlineColor="gray"
          secureTextEntry={secureNewPassword}
          right={
            <TextInput.Icon
              icon={secureNewPassword ? "eye" : "eye-off"}
              onPress={() => setSecureNewPassword(!secureNewPassword)}
            />
          }
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
          secureTextEntry={secureConfirmPassword}
          right={
            <TextInput.Icon
              icon={secureConfirmPassword ? "eye" : "eye-off"}
              onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
            />
          }
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
          SAVE PASSWORD
        </Button>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.containerPadding,
  },
  button: {
    backgroundColor: colors.color1,
  },
});
