import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";
// installed along with expo-av using npm install react-native-animatable expo-av
import * as Animatable from "react-native-animatable";

const zoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1.1,
	},
};

const zoomOut = {
	0: {
		scale: 1.1,
	},
	1: {
		scale: 0.9,
	},
};

const TrendingItem = ({ activeItem, item }) => {
	const [play, setPlay] = useState(false);
	return (
		<Animatable.View
			className="mr-5"
			// if the active item is centered($id) then zoom in, else zoom out
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Text className="text-white">Playing</Text>
			) : (
				<TouchableOpacity
					className="relative flex justify-center items-center"
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{
							uri: item.thumbnail,
						}}
						className="w-52 h-72 rounded-[30px] my-2 overflow-hidden shadow-lg shadow-black/40"
						resizeMode="cover"
					/>

					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	);
};

const TrendingList = ({ posts }) => {
	// sets the default active item to the first post
	const [activeItem, setActiveItem] = useState(posts[0]);

	const viewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	};
	return (
		<FlatList
			data={posts}
			horizontal
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
			contentOffset={{ x: 190 }}
			renderItem={({ item }) => (
				<TrendingItem key={item.$id} activeItem={activeItem} item={item} />
			)}
		/>
	);
};

export default TrendingList;
// pass horizontal property to <FlatList> and it goes horizontal
