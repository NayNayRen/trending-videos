import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { Stack } from "expo-router";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
				<Stack.Screen name="sign-up" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default AuthLayout;

// typing rnfe(react native functional export) builds a basic boilerplate
// AuthLayout is used since "user admin" screens don't have navigation
// Stack is used for route _layouts that need multiple screens
// Stack.Screen is used to stack each screen in the route folder
