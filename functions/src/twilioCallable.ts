import * as Twilio from 'twilio';

import * as functions from 'firebase-functions';
/* firebase functions:config:set apiName.sid="whatever" apiName.token="tokenCreds" */
const credentials = functions.config().twilio;

const client = Twilio(credentials.sid, credentials.token);

import * as admin from 'firebase-admin';
const db = admin.firestore();

export const sendText = functions.https.onCall(async (data, context) => {
    /* guarantees user is loggedin on front end */
    const userId = context.auth.uid;

    const userRef = db.doc(`users/${userId}`);

    const userSnapshot = await userRef.get();

    /* selects index in Firestore with relevant nam - hardcoding for example */
    const number = userSnapshot.data().phoneNumber;

    return client.messages.create({
        body: data.message,
        to: number,
        from: '+12058435756'
    }).then((message: any) => {
        // console.log('SMS Sent: ' + smsMessage + ' to ' + phoneNumber);
        console.log('SMS Sent');
        return true;
    })
        .catch((err: any) => {
            console.log(err)
            return false;
        }); 
})


