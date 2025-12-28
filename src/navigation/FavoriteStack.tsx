import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "src/features/favorites/screens/FavoritesScreen";
import MovieDetailsScreen from "src/features/movies/screens/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator id="FavoritesStack">
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
              name="MovieDetails"
              component={MovieDetailsScreen}
              options={{ title: "Details" }}
            />
    </Stack.Navigator>
  );
}
