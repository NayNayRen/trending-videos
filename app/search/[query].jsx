import { searchForPosts } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList } from "react-native";
import EmptyState from "../../components/EmptyState";
import React, { useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
	const { query } = useLocalSearchParams();
	// use a callback function when needing to pass params with function calls
	const { data: posts, refetch } = useAppwrite(() => searchForPosts(query));
	// any time the query changes refetch is called
	useEffect(() => {
		refetch();
	}, [query]);

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				renderItem={({ item }) => (
					<VideoCard
						key={item.$id}
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item.creator.username}
						avatar={item.creator.avatar}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4">
						<Text className="font-pmedium text-lg text-gray-100">
							Search Results...
						</Text>
						<Text className="text-2xl font-psemibold text-white">{query}</Text>
						<View className="my-6">
							<SearchInput initialQuery={query} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found..."
						subtitle="There were no videos found for this search."
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Search;
// <FlatList> maps an array of items, similar to foreach, array is passed to data
// renderItem takes item being displayed, with the component type to display it with
// ListHeaderComponent lets you build custom header
// <TrendingList> says use the first array, if it doesn't exist use the second one
// ListEmptyComponent holds <EmptyState> which displays if no videos are available
// RefreshControl allows for swiping down to reload the screen
