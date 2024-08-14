// DEFAULT LAYOUT AND STYLES
import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

// prevents splash screen from auto hiding before all assets are loaded
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	// known as a hook
	// fontsLoaded is the primary param, error is what happens if they don't load
	// first specify the name of the font, then its location using require
	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
		"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
	});
	// adding a useEffect hook, with dependency array
	// allows things to happen while screen is loading
	// fontsLoaded gets called everytime the screen changes, or when there's an error
	useEffect(() => {
		if (error) {
			throw error;
		}
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);
	// if no fontsLoaded and no error then something blew up
	if (!fontsLoaded && !error) {
		return null;
	}
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
};

export default RootLayout;

// Slot refers to and renders the current child route(index.jsx)
// Stack allows for the stacking of pages for routing purposes
// adding a folder wrapped in parenthesis() to the app folder is called a route group
// allows for the adding of screens that can have a special layout
