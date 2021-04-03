import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
const auth = firebase.auth();
// export const reportRef = database.ref(`daily-report`);

export const pushReport = ({
  date,
  text,
  uid,
}: {
  date: string;
  text: string;
  uid: string;
}) => {
  database.ref(`daily-report/${uid}`).push({ date, text });
};

export const updateReport = ({
  key,
  date,
  text,
  uid,
}: {
  key: string;
  date: string;
  text: string;
  uid: string;
}) => {
  return database.ref(`daily-report/${uid}/${key}`).update({ date, text });
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    return userCredential.user?.uid;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const signOut = async () => {
  await firebase.auth().signOut();
};
