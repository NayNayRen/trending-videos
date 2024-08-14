import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";

// building custom componenet is like your own function, passing params(props)
// returning the element/containeras a <Viwe> which is basically a HTML div
// icon image followed by its text
// ternary says if focuse its bold, else its normal
const TabIcon = ({ icon, name, color, focused }) => {
	return (
		<View style={styles.iconContainer}>
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text className={`${focused ? "font-psemibold" : "font-pregular"}`}>
				{name}
			</Text>
		</View>
	);
};
// Tabs.Screen will layout all links inside tabs folder as navigation
// setting tabBarShowLabel: false removes default label from each button
const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								color={color}
								name="Home"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;

const styles = StyleSheet.create({
	iconContainer: {
		display: "flex",
		alignItems: "center",
		justifyContenr: "center",
	},
});

// <> </> is an empty React component
