import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDvee7rtnrjcf6JkUvuDZoeihW30RWuvfA",
    authDomain: "manape-vegan.firebaseapp.com",
    databaseURL: "https://manape-vegan-default-rtdb.firebaseio.com",
    projectId: "manape-vegan",
    storageBucket: "manape-vegan.appspot.com",
    messagingSenderId: "790568087013",
    appId: "1:790568087013:web:6ffa6434931bb99b2f130c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
