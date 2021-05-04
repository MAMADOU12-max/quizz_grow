import app from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyD-GXkPY79M9YqJ3jxG0n95bMm322ucuHc",
    authDomain: "quizz-grow.firebaseapp.com",
    projectId: "quizz-grow",
    storageBucket: "quizz-grow.appspot.com",
    messagingSenderId: "308855369861",
    appId: "1:308855369861:web:ae06cc06c8ee80832179ec"
  };

class Firebase {
    constructor() {
        app.initializeApp(config); 
        this.auth = app.auth()
        this.db = app.firestore();
    }

    // method inscription
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // connexion 
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // deconnexion 
    signOutUser = () => this.auth.signOut();

    user= uid => this.db.doc(`users/${uid}`);

    // users gaming
    usersConnected   = uid => this.db.doc(`gaming/${uid}`);

}

export default Firebase;