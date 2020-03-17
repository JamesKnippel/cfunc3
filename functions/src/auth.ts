import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// tslint:disable-next-line: no-implicit-dependencies
import * as serviceAccount from '../_key.json';

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}

admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: "https://fir-primer-20332.firebaseio.com"
});

/* These functions will require service account authorization from the FB Console, 
add credentials to an env file or cmd line 'set/export GAPC=\path\to\key.json'*/


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