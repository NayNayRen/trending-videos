import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full h-full justify-between items-center px-3">
					<Image
						source={images.logo}
						className="w-[130px] h-[85px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>
					<View className="relative mt-5">
						<Text className="text-2xl text-white font-bold text-center">
							Find a new trend with
							<Text className={"text-secondary-200"}> Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[75px] absolute -bottom-4 -right-1"
							resizeMode="contain"
						/>
					</View>
					<Text className="text-sm text-gray-100 text-pregular text-center">
						Where creativity meets innovation...
					</Text>
					<CustomButton
						title="Continue With Email"
						handlePress={() => router.push("/sign-in")}
						containerStyles="w-full"
					/>
					<Image
						source={require("../assets/pw-logo.png")}
						style={styles.image}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	link: {
		color: "#00aeef",
	},
	image: {
		marginLeft: "auto",
		marginRight: "auto",
	},
});

// tailwind is in use for styling, uses className instead of style
// whenever you have the most outside <View> you should use <SafeAreaView>
// ensures nothing overlaps top or bottom bar and all content fits for all devices
// <ScrollView> is used since some content might be taller than the screen is
// if you want to use defined px for className, wrap in []
// using resizeMode="contain" keeps the image inside the defined size
// <StatusBar> is the bar at the top with battery, date, time etc.
// router.push is how React Native can redirect to another screen
