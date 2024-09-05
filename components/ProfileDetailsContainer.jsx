import { View, Text } from "react-native";
import React from "react";

const ProfileDetailsContainer = ({ title, subtitle, titleStyles }) => {
	return (
		<View className="flex-col items-center justify-center">
			<Text className={titleStyles}>{title}</Text>
			<Text className={titleStyles}>{subtitle}</Text>
		</View>
	);
};

export default ProfileDetailsContainer;
