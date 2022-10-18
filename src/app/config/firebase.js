import firebase from 'firebase';
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FKEY,
	authDomain: 'twitterclone-799f6.firebaseapp.com',
	projectId: 'twitterclone-799f6',
	storageBucket: 'twitterclone-799f6.appspot.com',
	messagingSenderId: '697300445995',
	appId: '1:697300445995:web:1da4f7e5bb02ce0053b36e',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const firestore = firebase.firestore;

export { auth, db, storage, firestore };
