import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
const TabIcon = ({ icon, name, color, focused }) => {
	return (
		<View>
			<Image source={icon} />
		</View>
	);
};
// Tabs.Screen will layout all links inside tabs folder as navigation
const TabsLayout = () => {
	return (
		<>
			<Tabs>
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

// <> </> is an empty React component
