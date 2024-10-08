import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
	const [play, setPlay] = useState(false);
	return (
		<View className="flex-col items-center px-4 mb-10">
			<View className="flex-row gap-3 items-start">
				<View className="justify-center items-center flex-row flex-1">
					<View className="w-[45px] h-[45px] rounded-lg border border-secondary justify-center items-center">
						<Image
							source={{ uri: avatar }}
							className="w-[90%] h-[90%] rounded-lg"
							resizeMode="cover"
						/>
					</View>
					<View className="justify-center flex-1 ml-3 gap-y-1">
						<Text
							className="text-xl text-white font-psemibold"
							numberOfLines={1}
						>
							{title}
						</Text>
						<Text
							className="text-sm text-gray-100 font-pregular"
							numberOfLines={1}
						>
							{creator}
						</Text>
					</View>
				</View>
				<View className="pt-2 w-5 h-5">
					<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
				</View>
			</View>
			{play ? (
				<Video
					source={{ uri: video }}
					className="w-full h-60 rounded-xl mt-3"
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status) => {
						if (status.didJustFinish) {
							setPlay(false);
						}
					}}
				/>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
					onPress={() => setPlay(true)}
				>
					<Image
						source={{ uri: thumbnail }}
						className="w-full h-full rounded-xl mt-3"
						resizeMode="cover"
					/>
					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default VideoCard;
