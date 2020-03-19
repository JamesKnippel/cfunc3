import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/* Defines Firestore instance */
const db = admin.firestore();

export const gameCounter = functions.firestore
    .document('games/{gameId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();
        const userRef = db.doc(`users/${data.uid}`);
        const userSnap = await userRef.get();
        const userData = userSnap.data();

        return userRef.update({
            updateCount: userData.updateCount + 1
        });
    });

    /* onUpdate takes two arguments for testing. expects: 'oh baby a triple'
    userTrend({ before: {
        uid: 'bradley',
        score: 777
    }, after: {
        uid: 'bradley',
        score: 9001
    }})
    */
export const userTrend = functions.firestore
    .document('games/{gameId}')
    .onUpdate((snapshot, context) => {
        const before = snapshot.before.data();
        const after = snapshot.after.data();
        let trend;

        /* process logic */
        if (after.score >= before.score) {
            trend = 'Oh baby, a triple!';
        } else {
            trend = 'oof, git gud kid lmao xDxD';
        }

        /* Target to send processed logic */
        const userRef = db.doc(`users/${after.uid}`);

        /* Send processed logic */
        return userRef.update({
            trend
        });
    });