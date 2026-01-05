import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "src/features/discover/screens/MovieDetailsScreen";
import TvDetailsScreen from "src/features/discover/screens/TvDetailsScreen";
import SearchScreen from "src/features/search/screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator id="SearchStack">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="TvDetails" component={TvDetailsScreen} />
    </Stack.Navigator>
  );
}