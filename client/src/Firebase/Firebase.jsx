import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    // Auth
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification();

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);
    
    doEmailUpdate = email => 
        this.auth.currentUser.updateEmail(email);

    doNameUpdate = name => this.auth.currentUser.updateProfile({
        displayName: name,
    })

    getUser = () => this.auth.currentUser;

    doDeleteUser = () => this.auth.currentUser.delete();

    reauthenticateWithEmailAndPassWord = (email, password) => 
        this.auth.currentUser.reauthenticateWithCredential(
            app.auth.EmailAuthProvider.credential(email, password)
        )

    rememberMe = (isRemembered) => 
        isRemembered ? 
            this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL)
         : 
            this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);
}

export default Firebase;