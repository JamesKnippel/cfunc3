import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

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
// const app = null;


const app = express();
app.use(cors({ origin: true}));

/* format is: ('/endpoint', callback(req, res)) */
app.get('/pickle', (request, response) => {
    response.send('I\'m a Pickle');
});

app.get('/rick', (request, response) => {
    response.send('Don\'t you think that\'s funny, Morty?');
});

export const api = functions.https.onRequest(app);
