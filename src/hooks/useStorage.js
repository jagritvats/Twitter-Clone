import { useEffect, useState } from 'react';
import { storage } from '../app/config/firebase';

const useStorage = (file) => {
	let [URL, setURL] = useState(null);
	let [loading, setLoading] = useState(true);
	let [error, setError] = useState(null);
	useEffect(() => {
		if (file === null) {
			setLoading(false);
		} else {
			setLoading(true);
			let fileRef = storage.ref('profileimages/' + file.name);

			fileRef
				.put(file)
				.then(async () => {
					const url = await fileRef.getDownloadURL();
					console.log(url);
					setURL(url);
					setLoading(false);
					setError(null);
				})
				.catch((err) => {
					setError(err);
					setLoading(false);
				});
		}
	}, [file]);

	return { URL, loading, error };
};

export default useStorage;
