import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
	return (
		<View className="justify-center items-center px-5">
			<Image
				source={images.empty}
				className="w-[250px] h-[215]"
				resizeMode="contain"
			/>
			<Text className="font-pmedium text-lg text-gray-100">{title}</Text>
			<Text className="text-xl font-psemibold text-white mt-5">{subtitle}</Text>
			<CustomButton
				title="Create Video"
				handlePress={() => router.push("/create")}
				containerStyles="w-full my-3"
			/>
		</View>
	);
};

export default EmptyState;
