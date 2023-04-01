// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLWbVrQ_PF6JCuZAbpjBnAXr3esSOexDg",
  authDomain: "galery-react.firebaseapp.com",
  projectId: "galery-react",
  storageBucket: "galery-react.appspot.com",
  messagingSenderId: "654886490664",
  appId: "1:654886490664:web:093632a9785b9cd5939b1d",
  measurementId: "G-B5CGMKLZ2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


// recibe un file
// retorna una URL del archivo subido
export async function uploadFile(file) {
    const storageRef = ref(storage, Date.now() + "-" + file.name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
    }

