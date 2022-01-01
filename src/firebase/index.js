import firebase from '@react-native-firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyAIOtAwwzCPcr9u7qmyqCAdpz2AGbIgOHg",
    authDomain: "wideview-42754.firebaseapp.com",
    databaseURL: "https://wideview-42754.firebaseio.com",
    projectId: "wideview-42754",
    storageBucket: "wideview-42754.appspot.com",
    messagingSenderId: "852484979646",
    appId: "1:852484979646:web:3f5474e37e5afa5a6157ef",
    measurementId: "G-PQ00QDX2CV"
};
  if (!firebase.apps.length) {  
             
    firebase.initializeApp(firebaseConfig);  
}                 
  export default firebase;