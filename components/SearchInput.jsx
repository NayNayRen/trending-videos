import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = () => {
	const pathName = usePathname();
	const [query, setQuery] = useState("");
	return (
		<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary items-center flex-row">
			<TextInput
				className="flex-1 text-white font-pregular text-base"
				value={query}
				placeholder="Find your flavor..."
				placeholderTextColor="#cdcde0"
				onChangeText={(e) => setQuery(e)}
			/>
			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert(
							"Empty Input",
							"We need something to search for..."
						);
					}
					// meens we are already on the search screen
					if (pathName.startsWith("/search")) {
						router.setParams({ query });
					} else {
						router.push(`/search/${query}`);
					}
				}}
			>
				<Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
