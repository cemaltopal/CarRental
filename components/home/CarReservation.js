import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import {
  Button,
  TextInput,
  HelperText,
  Modal,
  Portal,
  Title,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerTranslation, enGB } from "react-native-paper-dates";
import colors from "../../constants/colors";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { carApi } from "../../api/carApi";

import * as Yup from "yup";

registerTranslation("en", enGB);

const CarReservationForm = ({ data }) => {
  // Dogrulama fonksiyonları ve degiskenleri
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [reservationSuccessState, setReservationSuccessState] = useState({
    message: "Your Reservation Request Is Available",
    sucess: true,
  });
  const navigation = useNavigation();
  const [orderSummary, setOrderSummary] = useState({});

  //Formik States
  const validationSchema = Yup.object().shape({
    pickupLocation: Yup.string()
      .max(255)
      .required("Pickup Location Must Be Filled"),
    dropoffLocation: Yup.string()
      .max(255)
      .required("Dropoff Location Must Be Filled"),
    pickupDate: Yup.date().required("Pickup Date Must Be Filled"),
    dropoffDate: Yup.date().required("Dropoff Date Must Be Filled"),
  });

  const formik = useFormik({
    initialValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      dropoffDate: "",
    },
    //reserve butonuna basınca bu calısıyor
    onSubmit: async (values) => {
      //Reservation sorgusu gonderilecek , beraberinde car id, picup location, picupdate, dropoff location ve date
      //gonderilecek
      console.log(data.id);
      console.log(values);

      // carApi.isCarAvailableForReservation(
      //   data.id,
      //   "2024-09-26T19:20:04.745Z",
      //   "2024-09-26T19:20:04.745Z"
      // )
      carApi
        .addCarReservation(
          data.id,
          values.pickupDate,
          values.dropoffDate,
          values.pickupLocation,
          values.dropoffLocation
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setOrderSummary({ ...data, ...formik.values });
      showModal();
    },
    validationSchema,
  });
  //End Formik States DOgrulama fonksiyonları sonu

  //Date Picker States
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
      formik.setFieldValue("pickupDate", startDate);
      formik.setFieldValue("dropoffDate", endDate);
      console.log(range);
    },
    [setOpen, setRange]
  );
  // End Date Picker States

  /* MODAL DEGISKENLERI */
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  /* MODAL DEGISKENLERI SON */
  return (
    <View style={{ margin: 20 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Title
            style={reservationSuccessState.sucess ? styles.sucess : styles.fail}
          >
            Reservation Request:{" "}
            {reservationSuccessState.sucess ? "Successful" : "Not Available"}
          </Title>

          <Text>{reservationSuccessState.message}</Text>

          {!reservationSuccessState.sucess ? (
            <Button
              onPress={hideModal}
              mode="contained"
              style={{ ...styles.button, marginTop: 20 }}
            >
              Ok
            </Button>
          ) : (
            // Basarılı olma durumunda siparis detaları navigasyonla gonderiliyor
            <Button
              onPress={() =>
                navigation.navigate("PaymentScreen", {
                  ...orderSummary,
                  pickupDate: formik.values.pickupDate.toISOString(),
                  dropoffDate: formik.values.dropoffDate.toISOString(),
                })
              }
              mode="contained"
              style={{ ...styles.button, marginTop: 20 }}
            >
              MAKE PAYMENT
            </Button>
          )}
        </Modal>
      </Portal>

      <TextInput
        placeholder="Pick up location"
        value={formik.values.pickupLocation}
        onChangeText={formik.handleChange("pickupLocation")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.pickupLocation}>
        {formik.errors.pickupLocation}
      </HelperText>
      <TextInput
        placeholder="Drop off location"
        value={formik.values.dropoffLocation}
        onChangeText={formik.handleChange("dropoffLocation")}
        backgroundColor={colors.color7}
        style={{ padding: 5 }}
        activeUnderlineColor={colors.color1}
        underlineColor="gray"
      />
      <HelperText type="error" visible={formik.errors.dropoffLocation}>
        {formik.errors.dropoffLocation}
      </HelperText>
      {/* zaman secimi */}
      <SafeAreaProvider style={{ marginTop: 10, borderRadius: 10 }}>
        <View
          style={{
            width: "100%",
          }}
        >
          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined"
            style={styles.dateTimeButton}
          >
            <Text style={{ color: "black" }}>Pick range</Text>
          </Button>
          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={formik.values.pickupDate}
            endDate={formik.values.dropoffDate}
            onConfirm={onConfirm}
          />
        </View>
      </SafeAreaProvider>

      <HelperText type="error" visible={formik.errors.pickupDate}>
        {formik.errors.pickupDate} {formik.errors.dropoffDate}
      </HelperText>

      <View style={{ marginTop: 10 }}>
        <Button
          onPress={formik.handleSubmit}
          mode="contained"
          style={styles.button}
        >
          <Text style={{ color: "black" }}>Reserve</Text>
        </Button>
      </View>
    </View>
  );
};

export default CarReservationForm;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.color4,
    padding: 5,
    borderRadius: 30,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    height: 300,
    borderRadius: 10,
  },
  sucess: {
    color: "green",
  },
  fail: {
    color: "red",
  },
});
