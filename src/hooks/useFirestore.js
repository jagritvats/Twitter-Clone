import { db } from '../app/config/firebase';
import { useEffect, useState } from 'react';

const useFirestore = (collection, docid = null) => {
	var [data, setData] = useState(null);
	var [isLoading, setIsLoading] = useState(false);
	var [error, setError] = useState(null);

	useEffect(() => {
		if (collection) {
			if (docid) {
				setIsLoading(true);
				db.collection(collection)
					.get(docid)
					.then((doc) => {
						setData(doc.data());
						setIsLoading(false);
						setError(null);
					})
					.catch((err) => {
						setError(err);
						setIsLoading(true);
					});
			} else {
				// get full collection
				setIsLoading(true);
				let dt = [];
				db.collection(collection)
					.get()
					.then((docs) => {
						docs.forEach((doc) => {
							dt.push({ data: doc.data(), id: doc.id });
						});
						setData(dt);
						setIsLoading(false);
					})
					.catch((err) => {
						setError(err);
						setIsLoading(false);
					});
			}
		}
	}, [collection, docid]);

	db.collection(collection)
		.doc(docid)
		.get()
		.then((doc) => {
			data = doc.data();
		});
	return data;
};

export default useFirestore;
