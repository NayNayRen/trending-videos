import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import TrendingList from "../../components/TrendingList";
import EmptyState from "../../components/EmptyState";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
	const { data: posts, refetch } = useAppwrite(getAllPosts);
	// builds a refresher, when tyou pull down on the screen to reload
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
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
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found..."
						subtitle="Be the first to upload a video."
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
// <FlatList> maps an array of items, similar to foreach, array is passed to data
// renderItem takes item being displayed, with the component type to display it with
// ListHeaderComponent lets you build custom header
// <TrendingList> says use the first array, if it doesn't exist use the second one
// ListEmptyComponent holds <EmptyState> which displays if no videos are available
// RefreshControl allows for swiping down to reload the screen
