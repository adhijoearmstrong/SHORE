import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, StatusBar } from "native-base";

// Screens
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import AboutScreen from "./screens/AboutScreen";
import NewsDetail from "./screens/NewsDetail";
import HomeDetail from "./screens/HomeDetail";

//Screen names
const homeName = "Katalog";
const newsName = "News";
const favoriteName = "Favorite";
const aboutName = "About";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomMainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        unmountOnBlur: true, // menambahkan option ini  agar tidap masuk ke screen lain akan refresh halaman
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === newsName) {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (rn === aboutName) {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (rn === favoriteName) {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={newsName} component={NewsScreen} />
      <Tab.Screen name={favoriteName} component={FavoriteScreen} />
      <Tab.Screen name={aboutName} component={AboutScreen} />
    </Tab.Navigator>
  );
}

const MainContainer = () => {
  return (
    <NativeBaseProvider>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomMainContainer"
            component={BottomMainContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetail}
            options={{ title: "Detail Berita", headerShown: true }}
          />
          <Stack.Screen
            name="HomeDetail"
            component={HomeDetail}
            options={{ title: "Detail Katalog", headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default MainContainer;