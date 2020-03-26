/* Import individual Cloud Functions here, similar to Angular Modules */
export { basicHTTP, api } from './http';
export { createUserRecord } from './auth';
export { gameCounter, userTrend } from './firestore';
export { resizeAvatar } from './storage';
export { sendText } from './twilioCallable';



