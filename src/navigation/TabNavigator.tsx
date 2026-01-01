import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "src/navigation/types";

import FavoritesStack from "src/navigation/FavoriteStack";
import MoviesStack from "src/navigation/MoviesStack";
import SettingsStack from "src/navigation/SettingsStack";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "src/shared/theme/colors";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      id="RootTabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.errorToast,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;

          switch (route.name) {
            case "MoviesTab":
              iconName = focused ? "film" : "film-outline";
              break;
            case "FavoritesTab":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "SettingsTab":
              iconName = focused ? "settings" : "settings-outline";
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? colors.errorToast : colors.muted}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="MoviesTab"
        component={MoviesStack}
        options={{ title: "Movies" }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{ title: "Favorites" }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}
