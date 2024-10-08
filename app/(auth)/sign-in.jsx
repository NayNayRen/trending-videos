import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [isSubmitting, setisSubmitting] = useState(false);
	// sets value for email FormField below
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "All fields must have valid user information.");
		}
		setisSubmitting(true);
		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsLoggedIn(true);
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setisSubmitting(false);
		}
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] justify-center px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white mt-10 font-semibold">
						Log In
					</Text>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
					/>
					<CustomButton
						title="Sign In"
						handlePress={submit}
						containerStyles="w-full mt-10"
						isLoading={isSubmitting}
					/>
					<View className="justify-center items-center pt-5 flex-column gap-2">
						<Text className="text-gray-100 font-pregular">
							Don't have an account?
						</Text>
						<Link href="/sign-up" className="font-psemibold text-secondary">
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
// good naming convention for hooks and state is whatever the name of the state(form) is,
// the function name(setForm) should be the same as the state, only adding "set" to it
// keyboardType is usefull for autofilling on mobile
