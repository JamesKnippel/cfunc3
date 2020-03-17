import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const basicHTTP = functions.https.onRequest((request, response) => {

    /* parse the request for data, wildcard in
    ex: http://localhost:5001/fir-primer-20332/us-central1/
    basicHTTP + ?name=jimbo%20knippel 
    where: ?=name is your url parameter, usually $uid in firebase
    for production
    */
    const name = request.query.name;
    if (!name) {
        response.status(400)
        .send('Error bud - you must supply a name!');
    }
    response.send (`hello ${name}`);

    /* HardCode Implementation */
    // response.send('Hello from Firebase, James!');
      
});

/* Instead of defining multiple individual functions, I can create an express.js
application with multiple API routes and the bundle as a whole  */

// Placeholder for Express App
const app = null;

export const api = functions.https.onRequest(app);
