import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";

export default function App() {
	return (
		<View className="flex-1 items-center justify-center bg-red">
			<Text className="text-3xl font-pblack">Trending Videos</Text>
			<StatusBar style="auto" />
			<Link href="/home" style={styles.link}>
				Go to Home...
			</Link>
			<Image source={require("../assets/pw-logo.png")} style={styles.image} />
		</View>
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

// View component is basically an HTML <div> element
// tailwind is in use for styling, uses className instead of style
