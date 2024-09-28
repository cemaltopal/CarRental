import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MaskedText } from "react-native-mask-text";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, HelperText, Button, List, text } from "react-native-paper";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import CarDetailsCard from "../components/common/CarDetails";
import dateTimeFormatter from "../components/common/dateTimeFormatter";
import { MaskedTextInput } from "react-native-mask-text";

const PaymentScreen = ({ route }) => {
  const orderSummary = route.params;
  console.log("orderSummary");
  console.log(orderSummary);
  //   {"age": 0, "airConditioning": true, "builtIn": true, "doors": 5,
  //   "dropoffDate": 2024-09-25T23:59:59.999Z, "dropoffLocation": "istanbultt", "fuelType":
  //   "Benzin", "id": 0, "image":
  //   ["https://carrental-v3-backend.herokuapp.com/files/display/4e1e497b-13d1-4d4f-b765-3d66763aba9e"],
  //   "luggage": 0, "model": "Audi Q5", "pickupDate": 2024-09-17T22:00:00.000Z, "pickupLocation": "ankaraaasd",
  //   "pricePerHour": 60, "seats": 4, "transmission": "Manuel"}

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .matches(/^[a-zA-Z ]*$/, "Only alphabets and spaces are allowed"),
    cardNumber: Yup.string().max(16).required("Card Number is required"),
    expireDate: Yup.string()
      .required("Expire Date is required")
      .test("expireDate", "Expire Date Must Be a Valid Date!", (value) => {
        let month = value.slice(0, 2);
        let year = value.slice(3, 5);
        let date = new Date();
        let currentYear = date.getFullYear().toString().slice(2, 4);
        return month > 0 && month < 13 && year >= currentYear;
      }),
    cvv: Yup.string().max(3).required("CVV is required"),
  });

  const initialValues = {
    fullName: "",
    cardNumber: "",
    expireDate: "",
    cvv: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    // odeme alt yapısına API ile sorgu godnererek odemeyi gerceklestirecek
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const calculateTotal = () => {
    let total = 0;
    let pickupDate = new Date(orderSummary.pickupDate);
    let dropoffDate = new Date(orderSummary.dropoffDate);
    let diff = Math.abs(pickupDate - dropoffDate);
    console.log(
      "zaman farki: ",
      diff,
      " saat olarak: ",
      diff / (1000 * 60 * 60)
    );
    let totalPrice = (orderSummary.pricePerHour * diff) / (1000 * 60 * 60);
    return totalPrice;
  };
  return (
    <ScrollView style={styles.container}>
      <CarDetailsCard details={orderSummary} />
      <List.Item
        title="Pickup Location"
        titleStyle={{ fontWeight: "bold" }}
        description={orderSummary.pickupLocation}
        left={(props) => (
          <List.Icon
            {...props}
            icon="map-marker-right-outline"
            color={colors.color1}
          />
        )}
      />

      <List.Item
        title="Dropoff Location"
        titleStyle={{ fontWeight: "bold" }}
        description={orderSummary.dropoffLocation}
        left={(props) => (
          <List.Icon
            {...props}
            icon="map-marker-left-outline"
            color={colors.color1}
          />
        )}
      />

      <List.Item
        title="Pickup Date"
        titleStyle={{ fontWeight: "bold" }}
        description={dateTimeFormatter(orderSummary.pickupDate)}
        left={(props) => (
          <List.Icon {...props} icon="calendar-outline" color={colors.color1} />
        )}
      />

      <List.Item
        title="Dropoff Date"
        titleStyle={{ fontWeight: "bold" }}
        description={dateTimeFormatter(orderSummary.dropoffDate)}
        left={(props) => (
          <List.Icon {...props} icon="calendar-outline" color={colors.color1} />
        )}
      />

      <List.Item
        title="Total"
        titleStyle={{ fontWeight: "bold" }}
        description={calculateTotal().toFixed(2)}
        left={(props) => (
          <List.Icon {...props} icon="cash" color={colors.color1} />
        )}
      />
      <TextInput
        placeholder="Card Holder's Name"
        value={formik.values.fullName}
        onChangeText={formik.handleChange("fullName")}
        backgroundColor={colors.color7}
        style={{ padding: 5, marginTop: 20 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.fullName}>
        {formik.errors.fullName}
      </HelperText>

      <TextInput
        placeholder="Card Number"
        value={formik.values.cardNumber}
        onChangeText={formik.handleChange("cardNumber")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
        keyboardType="numeric"
        render={(props) => (
          <MaskedTextInput {...props} mask="9999 9999 9999 9999" />
        )}
      />
      <HelperText type="error" visible={formik.errors.cardNumber}>
        {formik.errors.cardNumber}
      </HelperText>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", flex: 3, marginRight: 10 }}>
          <TextInput
            placeholder="Expire Date"
            value={formik.values.expireDate}
            onChangeText={formik.handleChange("expireDate")}
            backgroundColor={colors.color7}
            activeUnderlineColor={colors.color1}
            underlineColor="gray"
            render={(props) => (
              <MaskedTextInput {...props} mask="99/99" keyboardType="numeric" />
            )}
          />
          <HelperText type="error" visible={formik.errors.expireDate}>
            {formik.errors.expireDate}
          </HelperText>
        </View>

        <View style={{ flexDirection: "column", flex: 2 }}>
          {/* Masked CVV Input */}
          <TextInput
            label="CVV"
            value={formik.values.cvv}
            onChangeText={formik.handleChange("cvv")}
            backgroundColor={colors.color7}
            activeUnderlineColor={colors.color1}
            underlineColor="gray"
            render={(props) => (
              <MaskedTextInput {...props} mask="999" keyboardType="numeric" />
            )}
            //style={styles.input}
            activeOutlineColor={colors.color1}
          />

          <HelperText type="error" visible={formik.errors.cvv}>
            {formik.errors.cvv}
          </HelperText>
        </View>
      </View>
      <Button
        icon="credit-card"
        mode="contained"
        onPress={formik.handleSubmit}
        style={{ marginBottom: 40, backgroundColor: colors.color1 }}
        disabled={!formik.isValid}
      >
        Pay
      </Button>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
