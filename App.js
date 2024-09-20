import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountStack from "./screens/navigation/AccountStack";
import HomeStack from "./screens/navigation/HomeStack";
import AboutStack from "./screens/navigation/AboutStack";
import colors from "./constants/colors";
import sizes from "./constants/sizes";
import Icon from "@expo/vector-icons/Feather";
import { PaperProvider } from "react-native-paper";
import AppContext from "./store/AppContext";
import { useState } from "react";

export default function App() {
  const Tab = createBottomTabNavigator();
  const [searchActive, setSearchActive] = useState(false);

  return (
    <AppContext.Provider value={{ searchActive, setSearchActive }}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: colors.color1,
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="home"
                    color={colors.color1}
                    size={sizes.tabIconSize}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="About"
              component={AboutStack}
              options={{
                tabBarLabel: "About",
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="info"
                    color={colors.color1}
                    size={sizes.tabIconSize}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Account"
              component={AccountStack}
              options={{
                tabBarLabel: "Account",
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="user"
                    color={colors.color1}
                    size={sizes.tabIconSize}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
