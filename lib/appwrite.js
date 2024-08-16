import { Account, Client, ID } from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jeditendencies.trendingvideos",
	projectId: "66be91b500144c3605c9",
	databaseId: "66be935a00268e32ab2d",
	userCollectionId: "66be939f00377d818376",
	videoCollectionId: "66be93cd0037b09ee676",
	storageId: "66be95bd002099000476",
};

// Init your React Native SDK
const client = new Client();
client
	.setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
	.setProject(appwriteConfig.projectId) // Your project ID
	.setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
// Register User
export const createUser = () => {
	account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
		function (response) {
			console.log(response);
		},
		function (error) {
			console.log(error);
		}
	);
};
