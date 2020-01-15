import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC8AFeSoVxQp3R2JnSbn6vo2P5JT2DrhAM",
    authDomain: "workout-tracker-v1.firebaseapp.com",
    databaseURL: "https://workout-tracker-v1.firebaseio.com",
    projectId: "workout-tracker-v1",
    storageBucket: "workout-tracker-v1.appspot.com",
    messagingSenderId: "829690854824",
    appId: "1:829690854824:web:f482312b6e1b99104ef19d",
    measurementId: "G-281NKDDPQD"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
}

export default Firebase;