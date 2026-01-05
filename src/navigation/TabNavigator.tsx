import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "src/navigation/types";

import DiscoverStack from "src/navigation/DiscoverStack";
import FavoritesStack from "src/navigation/FavoriteStack";
import SettingsStack from "src/navigation/SettingsStack";
import { useContentTypeStore } from "src/shared/store/discover.store";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "src/shared/theme/colors";
import SearchStack from "./SearchStack";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const contentType = useContentTypeStore((s) => s.contentType);

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
            case "DiscoverTab":
              iconName =
                contentType === "movie"
                  ? focused
                    ? "film"
                    : "film-outline"
                  : "tv-outline";
              break;
            case "SearchTab":
              iconName = focused ? "search" : "search-outline";
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
        name="DiscoverTab"
        component={DiscoverStack}
        options={{ title: "Discover" }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{ title: "Search" }}
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
