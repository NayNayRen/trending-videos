import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";

// building custom componenet is like your own function, passing params(props)
// returning the element/containeras a <View> which is basically a HTML div
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
			<Text
				className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
				style={{ color: color }}
			>
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
					tabBarActiveTintColor: "#ffa001",
					tabBarInactiveTintColor: "#cdcde0",
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 1,
						borderTopColor: "#232533",
						height: 85,
					},
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
				<Tabs.Screen
					name="bookmark"
					options={{
						title: "Bookmark",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								color={color}
								name="Bookmark"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: "Create",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								color={color}
								name="Create"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default TabsLayout;

const styles = StyleSheet.create({
	iconContainer: {
		display: "flex",
		alignItems: "center",
		justifyContenr: "center",
		gap: 2,
	},
});

// <> </> is an empty React component
