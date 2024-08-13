// Slot refers to and renders the current child route(index.jsx)
// Stack allows for the stacking of pages for routing purposes
import { Text } from "react-native";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
		</Stack>
	);
};

export default RootLayout;
