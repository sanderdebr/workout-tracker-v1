import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
        this.db = app.database();
    }

    /*** AUTH API ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    /*** USER API ***/
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    /*** ACTIVITY API ***/
    activity = (uid, activity, action) => {
        const ref = this.db.ref().child(`users/${uid}/activities`);

        if (action === 'add') {

        }
        if (action === 'update') {
            ref.push(activity)
        }
        if (action === 'getRef') return ref;
    }
    // addActivity = (uid, activity) => this.db.ref().child(`users/${uid}`).set({ activity });

}

export default Firebase;