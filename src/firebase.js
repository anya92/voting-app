import * as firebase from 'firebase';

import config from './config';

export const firebaseApp = firebase.initializeApp(config);
firebaseApp.auth().useDeviceLanguage();
export const userRef = firebase.database().ref('users');
export const pollRef = firebase.database().ref('polls');
