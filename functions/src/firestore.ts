import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/* Defines Firestore instance */
const db = admin.firestore();

export const documentCounter = functions.firestore
    .document('documents/estateManagement/Wills/{documentId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();
        const userRef = db.doc(`users/${data.uid}`);
        const userSnap = await userRef.get();
        const userData = userSnap.data();

        return userRef.update({
            updateCount: userData.updateCount + 1
        });
    });