import Axios from "axios";
import * as SecureStore from "expo-secure-store";

export const carApi = {
  listAllCars: async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log("TOKEN:::::: ", token);
    if (!token) {
      return null;
    }
    return Axios.get(
      "https://carrental-v3-backend.herokuapp.com/car/visitors/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("****List All Cars Response: ***");
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  isCarAvailableForReservation: async (carId, pickupDate, dropoffDate) => {
    const token = await SecureStore.getItemAsync("token");
    console.log("TOKEN:::::: ", token);
    if (!token) {
      return null;
    }
    return Axios.get(
      `https://carrental-v3-backend.herokuapp.com/reservations/auth?carId=${carId}&pickUpDateTime=${pickupDate}&dropOffDateTime=${dropoffDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("****Is Car Available For Reservation Response: ***");
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  },

  addCarReservation: async (
    carId,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation
  ) => {
    console.log("addCarReservation api");
    console.log(
      carId,
      pickupDate,
      dropoffDate,
      pickupLocation,
      dropoffLocation
    );
    const token = await SecureStore.getItemAsync("token");
    console.log("TOKEN:::::: ", token);
    if (!token) {
      return null;
    }
    return Axios.post(
      `https://carrental-v3-backend.herokuapp.com/reservations/add?carId=${carId}`,
      {
        pickUpTime: pickupDate,
        dropOffTime: dropoffDate,
        pickUpLocation: pickupLocation,
        dropOffLocation: dropoffLocation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("****Add Reservation Response: ***");
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  },
};
