import axios from 'axios';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export const uploadFiles = async (files) => {
    const uploaded = [];    
    
	for (const f of files) {
        const { file, type } = f;
        
        const formData = new FormData();
        formData.append('upload_preset', cloud_secret);
		formData.append('file', file);
        console.log(formData);
        
		const response = await uploadToCloudinary(formData);

		uploaded.push({
			file: response,
			type,
		});
	}

	return uploaded;
};

const uploadToCloudinary = async (formData) => {
    
	return new Promise(async (resolve) => {
		return await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`, formData)
			.then(({ data }) => {
				resolve(data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
};
