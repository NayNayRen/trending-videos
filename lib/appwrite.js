import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
} from "react-native-appwrite";
// all gotten from Appwrite project dashboard
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
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

const account = new Account(client);
// creates new avatar instance
const avatars = new Avatars(client);
// creates new db instance
const databases = new Databases(client);
// storage for uploaded content
const storage = new Storage(client);

// Register User
export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);
		if (!newAccount) {
			throw Error;
		} else {
			// creates an avatar out of user initials
			const avatarUrl = avatars.getInitials(username);
			// await signIn(email, password);
			// gets config data from above, makes unique ID, creates new user object
			const newUser = await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.userCollectionId,
				ID.unique(),
				{
					accountId: newAccount.$id,
					email,
					username,
					avatar: avatarUrl,
				}
			);
			return newUser;
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
// sign user in on successful registration
export const signIn = async (email, password) => {
	try {
		// create a user session, method is created by Appwrite
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export const signOut = async () => {
	try {
		const session = await account.deleteSession("current");
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) {
			throw Error;
		} else {
			const currentUser = await databases.listDocuments(
				appwriteConfig.databaseId,
				appwriteConfig.userCollectionId,
				[Query.equal("accountId", currentAccount.$id)]
			);
			if (!currentUser) {
				throw Error;
			} else {
				return currentUser.documents[0];
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.orderDesc("$createdAt", Query.limit(7))]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getUsersPosts = async (userId) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.equal("creator", userId), Query.orderDesc("$createdAt")]
		);
		// console.log(todos);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const searchForPosts = async (query) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			[Query.search("title", query)]
		);
		if (!posts) {
			throw new Error("Something went wrong");
		}
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getFilePreview = async (fileId, type) => {
	let fileUrl;
	try {
		if (type === "video") {
			fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
		} else if (type === "image") {
			// width, height, gravity, quality
			fileUrl = storage.getFilePreview(
				appwriteConfig.storageId,
				fileId,
				2000,
				2000,
				"top",
				100
			);
		} else {
			throw new Error("Invalid file type");
		}
		if (!fileUrl) {
			throw Error;
		} else {
			return fileUrl;
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

export const uploadFile = async (file, type) => {
	if (!file) {
		return;
	}
	const { mimeType, ...rest } = file;
	const asset = { type: mimeType, ...rest };
	try {
		const uploadedFile = await storage.createFile(
			appwriteConfig.storageId,
			ID.unique(),
			asset
		);
		const fileUrl = await getFilePreview(uploadedFile.$id, type);
		return fileUrl;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const createNewVideo = async (form) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, "image"),
			uploadFile(form.video, "video"),
		]);
		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId,
			}
		);
		return newPost;
	} catch (error) {
		throw new Error(error.message);
	}
};
