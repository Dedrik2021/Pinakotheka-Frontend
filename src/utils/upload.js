import axios from 'axios';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, listAll } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; 

import { storage } from '../firebase/firebaseConfig';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export const uploadFiles = async (files, setProgress) => {
	const uploaded = [];

	for (const f of files) {
		const { file, type } = f;

		// const formData = new FormData();
		// formData.append('upload_preset', cloud_secret);
		// formData.append('file', file);
		// console.log(formData);

		const response = await uploadToFirebase(file, setProgress);

		uploaded.push({
			file: response,
			type,
		});
	}

	return uploaded;
};

// const uploadToCloudinary = async (file) => {
// return new Promise(async (resolve) => {
// 	return await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`, formData)
// 		.then(({ data }) => {
// 			resolve(data);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

// if (!file) return;

// const storageRef = ref(storage, `files/${formData.name}`);
// await uploadBytes(storageRef, formData).then((snapshot) => {
// 	const result = getDownloadURL(snapshot.ref).then((downloadURL) => {
// 		console.log('File available at:', downloadURL);
// 		// setUrl(downloadURL);
// 		return downloadURL
// 	});
// 	return result;
// });

// const storageRef = ref(storage, `files/${file.name}`);
// 	const uploadTask = uploadBytesResumable(storageRef, file);
// 	uploadTask.on(
// 		'state_changed',
// 		(snapshot) => {
// 			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// 			console.log('Upload is ' + progress + '% done');
// 		},
// 		(error) => {
// 			console.log(error.message);
// 		},
// 		() => {
// 			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// 				console.log('File available at', downloadURL);
// 				return downloadURL
// 			});
// 		},
// 	);
// };

const uploadToFirebase = async (file, setProgress) => {
	if (!file) return;

	const baseFileName = file.name;
	let filePath = `files/${baseFileName}`;
	let fileExists = true;

	try {
		await getDownloadURL(ref(storage, filePath));
	} catch (error) {
		if (error.code === 'storage/object-not-found') {
			fileExists = false; 
		}
	}

	if (fileExists) {
		const timestamp = Date.now();
		const uniqueId = uuidv4();
		const fileExtension = baseFileName.split('.').pop();
		filePath = `files/${baseFileName}-${uniqueId}-${timestamp}.${fileExtension}`;
	}

	return new Promise((resolve, reject) => {
		const storageRef = ref(storage, filePath);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');

				setProgress(prevProgress => ({
					...prevProgress,
					fileName: file.name, progress: Math.round(progress)
				}));
			},
			(error) => {
				console.error('Upload failed:', error.message);
				reject(error);
			},
			async () => {
				try {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					resolve({
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
						url: downloadURL,
						uploadedAs: filePath, 
					});
				} catch (error) {
					reject(error);
				}
			}
		);
	});
};
