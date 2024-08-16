import { View, Text, FlatList } from "react-native";
import React from "react";
import { Image } from "react-native";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import TrendingList from "../../components/TrendingList";

const Home = () => {
	return (
		<SafeAreaView className="bg-primary">
			<FlatList
				data={[{ id: 1 }, { id: 2 }]}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<Text className="text-2xl text-white">{item.id}</Text>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-lg text-gray-100">
									Welcome Back...
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									Jedi Mind
								</Text>
							</View>
							<View className="mt-2">
								<Image
									source={images.logoSmall}
									className="w-8 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>

						<SearchInput />

						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-gray-100 text-lg font-pregular mb-3">
								Latest Videos...
							</Text>
							<TrendingList posts={[{ id: 1 }, { id: 2 }] ?? []} />
						</View>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default Home;
// <FlatList> maps an array of items, similar to foreach, array is passed to data
// renderItem takes item being displayed, with the component type to display it with
// ListHeaderComponent lets you build custom header
// <TrendingList> says use the first array, if it doesn't exist use the second one
