import Axios from "axios";
import * as SecureStore from "expo-secure-store";

export const userApi = {
  login: async (email, password) => {
    return Axios.post("https://carrental-v3-backend.herokuapp.com/login", {
      email: email,
      password: password,
    })
      .then(async (response) => {
        SecureStore.setItemAsync("token", response.data.token);
        return true;
      })
      .catch((error) => {
        console.log("Login Error: ", error.response.data.message);
        return error.response.data.message;
      });
  },

  //   {
  //     "id": 0,
  //     "firstName": "string",
  //     "lastName": "string",
  //     "email": "string",
  //     "phoneNumber": "string",
  //     "address": "string",
  //     "zipCode": "string",
  //     "builtIn": true,
  //     "roles": [
  //       "string"
  //     ]
  //   }
  getUserDetails: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      console.log("TOKEN:::::: ", token);
      if (!token) {
        return null;
      }
      return Axios.get("https://carrental-v3-backend.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("****Get User Response: ");
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log("Get User Error:", error.response.data.message);
          return error.response.data.message;
        });
    } catch (error) {
      console.log("THERE IS NO TOKEN ");
      console.log(error);
      return "An Unknown Error Occured";
    }
  },

  updateUserDetails: async (data) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      console.log("TOKEN:::::: ", token);
      if (!token) {
        return null;
      }
      return Axios.put(
        "https://carrental-v3-backend.herokuapp.com/user",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          console.log("****Update User Response: ");
          console.log(response.data);
          return true;
        })
        .catch((error) => {
          console.log("Update User Error:", error.response.data.message);
          return error.response.data.message;
        });
    } catch (error) {
      console.log("THERE IS NO TOKEN ");
      console.log(error);
      return "An Unknown Error Occured";
    }
  },

  //Telefon NUmarası Formatı: (666) 555-5555
  registerUser: async (data) => {
    console.log("registerUser: ");
    console.log(data);
    return Axios.post(
      "https://carrental-v3-backend.herokuapp.com/register",
      data
    )
      .then((response) => {
        console.log("****Register User Response: ");
        console.log(response.data);
        return true;
      })
      .catch((error) => {
        console.log("Register User Error:", error.response.data.message);
        return error.response.data.message;
      });
  },

  // {
  //   "oldPassword": "string",
  //   "newPassword": "string"
  // }
  updateUserPassword: async (data) => {
    const token = await SecureStore.getItemAsync("token");
    console.log("TOKEN:::::: ", token);
    if (!token) {
      return null;
    }
    return Axios.patch(
      "https://carrental-v3-backend.herokuapp.com/user/auth",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("****Update User Password Response: ");
        console.log(response.data);
        return true;
      })
      .catch((error) => {
        console.log("Update User Password Error:", error.response.data.message);
        return error.response.data.message;
      });
  },

  listAllReservations: async (page, size) => {
    const token = await SecureStore.getItemAsync("token");
    console.log("TOKEN:::::: ", token);
    if (!token) {
      return null;
    }
    return Axios.get(
      `https://carrental-v3-backend.herokuapp.com/reservations/auth/all?page=${page}&size=${size}&sort=ASC`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("****List All Reservations Response: ");
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(
          "List All Reservations Error:",
          error.response.data.message
        );
        return null;
      });
  },
};
