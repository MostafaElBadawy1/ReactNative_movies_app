import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "src/features/discover/screens/DiscoverScreen";
import MovieDetailsScreen from "src/features/discover/screens/MovieDetailsScreen";
import TvDetailsScreen from "src/features/discover/screens/TvDetailsScreen";
import { MediaStackParamList } from "src/navigation/types";

export const Stack = createNativeStackNavigator<MediaStackParamList>();

export default function MoviesStack() {
  return (
    <Stack.Navigator id="DiscoverStack">
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ title: "Discover" }}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="TvDetails" component={TvDetailsScreen} />
    </Stack.Navigator>
  );
}
