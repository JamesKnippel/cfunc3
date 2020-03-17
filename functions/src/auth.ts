import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/* point to the database outside functions to ensure faster performance */
const db = admin.firestore();

/* I want to define a cloud function that creates a user record in Firestore */
export const createUserRecord = functions.auth
    .user()
    .onCreate((user, context) => {
        /* user has access to basics such as id, name etc.
            context may return authTypes, timeStamps etc.
            thus, define a schema using db.doc below */

       const grabbedUserRef = db.doc(`users/${user.uid}`);
       return grabbedUserRef.set({
           name: user.displayName,
           createdAt: context.timestamp,
           favoriteFood: 'sushi'
       });
    });