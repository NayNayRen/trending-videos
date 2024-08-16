import { View, Text, FlatList } from "react-native";
import React from "react";

const TrendingList = ({ posts }) => {
	return (
		<FlatList
			horizontal
			data={posts}
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
				<Text className="text-2xl text-white">{item.id}</Text>
			)}
		/>
	);
};

export default TrendingList;
// pass horizontal property to <FlatList> and it goes horizontal
