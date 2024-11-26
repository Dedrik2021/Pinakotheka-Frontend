import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';

export const removeMessageFilesFromFirebase = async (files) => {
	try {
		const deletePromises = files.map(async (filePath) => {
			if (filePath.file.url) {
				const fileRef = ref(storage, filePath.file.url);
				await deleteObject(fileRef);
			}
		});

		await Promise.all(deletePromises);
		console.log('All files deleted successfully.');
	} catch (error) {
		console.error('Error deleting files:', error);
	}
};
