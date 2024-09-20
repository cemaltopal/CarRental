import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { Button, TextInput, HelperText } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerTranslation, enGB } from "react-native-paper-dates";
import colors from "../../constants/colors";
import { useFormik } from "formik";

import * as Yup from "yup";

registerTranslation("en", enGB);

const CarReservation = () => {
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
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

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

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  return (
    <View style={{ margin: 20 }}>
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

export default CarReservation;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.color4,
    padding: 5,
    borderRadius: 30,
  },
});
