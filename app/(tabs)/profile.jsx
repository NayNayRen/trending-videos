import { getUsersPosts, signOut } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import EmptyState from "../../components/EmptyState";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect } from "react";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import ProfileDetailsContainer from "../../components/ProfileDetailsContainer";
import { router } from "expo-router";

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	// use a callback function when needing to pass params with function calls
	const { data: posts } = useAppwrite(() => getUsersPosts(user.$id));

	const logOut = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace("/sign-in");
	};

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
					<View className="my-6 px-4 justify-center items-center w-full">
						<View className="justify-center items-end w-full">
							<TouchableOpacity onPress={logOut}>
								<FontAwesome5 name="sign-out-alt" size={26} color="#cdcde0" />
							</TouchableOpacity>
						</View>
						<View className="w-[45px] h-[45px] rounded-lg border border-secondary justify-center items-center mb-3">
							<Image
								source={
									!user?.avatar
										? require("../../assets/favicon.png")
										: { uri: user?.avatar }
								}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>

						<ProfileDetailsContainer
							title={user?.username}
							titleStyles="font-psemibold text-lg text-white"
						/>
						<View className="flex-row justify-center items-center w-full">
							<ProfileDetailsContainer
								title={posts.length || 0}
								subtitle="Posts"
								titleStyles="font-pmedium text-sm text-gray-100 mx-3"
							/>
							<ProfileDetailsContainer
								title="1.2k"
								subtitle="Views"
								titleStyles="font-pmedium text-sm text-gray-100 mx-3"
							/>
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

export default Profile;
// <FlatList> maps an array of items, similar to foreach, array is passed to data
// renderItem takes item being displayed, with the component type to display it with
// ListHeaderComponent lets you build custom header
// <TrendingList> says use the first array, if it doesn't exist use the second one
// ListEmptyComponent holds <EmptyState> which displays if no videos are available
// RefreshControl allows for swiping down to reload the screen
