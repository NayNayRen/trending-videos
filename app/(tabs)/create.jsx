import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
import { createNewVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState({
		title: "",
		video: null,
		thumbnail: null,
		prompt: "",
	});

	const filePicker = async (fileType) => {
		const result = await DocumentPicker.getDocumentAsync({
			type:
				fileType === "image"
					? ["image/png", "image/jpg", "image/jpeg"]
					: ["video/mp4", "video/gif"],
		});
		if (!result.canceled) {
			if (fileType === "image") {
				setForm({ ...form, thumbnail: result.assets[0] });
			}
			if (fileType === "video") {
				setForm({ ...form, video: result.assets[0] });
			}
		}
	};

	const submit = async () => {
		if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
			return Alert.alert(
				"Empty Selections",
				"Please fill out all entries to upload and publish your content."
			);
		}
		setUploading(true);
		try {
			await createNewVideo({ ...form, userId: user.$id });
			Alert.alert(
				"Successfull Upload",
				"Your content was uploaded successfully."
			);
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error Occurred", error.message);
		} finally {
			setForm({
				title: "",
				video: null,
				thumbnail: null,
				prompt: "",
			});
			setUploading(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView className="px-4 my-5">
				<Text className="text-2xl text-white font-psemibold">
					Upload Video...
				</Text>
				<FormField
					title="Video Title"
					value={form.title}
					placeholder="Don't forget a title..."
					handleChangeText={(e) => setForm({ ...form, title: e })}
					otherStyles="mt-5"
				/>
				<View className="mt-5 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Upload Video
					</Text>
					<TouchableOpacity onPress={() => filePicker("video")}>
						{form.video ? (
							<Video
								source={{ uri: form.video.uri }}
								className="w-full h-64 rounded-2xl"
								resizeMode={ResizeMode.COVER}
							/>
						) : (
							<View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
								<View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
									<Image
										source={icons.upload}
										className="w-1/2 h-1/2"
										resizeMode="contain"
									/>
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View className="mt-5 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Thumbnail
					</Text>
					<TouchableOpacity onPress={() => filePicker("image")}>
						{form.thumbnail ? (
							<Image
								source={{ uri: form.thumbnail.uri }}
								className="w-full h-64 rounded-2xl"
								resizeMode="cover"
							/>
						) : (
							<View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex-row space-x-2 justify-center items-center">
								<Image
									source={icons.upload}
									className="w-5 h-5"
									resizeMode="contain"
								/>
								<Text className="text-sm text-gray-100 font-pmedium">
									Upload a Thumbnail
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<FormField
					title="AI Prompt"
					value={form.prompt}
					placeholder="The prompt to create this video......"
					handleChangeText={(e) => setForm({ ...form, prompt: e })}
					otherStyles="mt-5"
				/>
				<CustomButton
					title="Submit & Publish"
					handlePress={submit}
					containerStyles="mt-5"
					isLoading={uploading}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
