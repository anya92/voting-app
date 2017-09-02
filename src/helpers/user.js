import * as firebase from 'firebase';
import { firebaseApp, userRef } from '../firebase';

export function updateUser(displayName, photoURL) {
  const user = firebaseApp.auth().currentUser;
  user.updateProfile({
    displayName,
    photoURL
  }).then(() => {
    // save new user data to db
    const { uid, displayName, photoURL } = user;
    userRef.child(uid).update({
      displayName,
      photoURL
    });
  })
}

export function changeEmail(email, newEmail, password) {
  const user = firebaseApp.auth().currentUser;
  // user needs to be reauthenticated
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);

  return new Promise((resolve, reject) => {
    user.reauthenticateWithCredential(credential).then(() => {

      user.updateEmail(newEmail).then(() => {
        const { uid, email } = user;
        userRef.child(uid).update({ email });
        resolve('Email został zmieniony pomyślnie.');

      }).catch(error => reject(error.message));
    }).catch(error => reject(error.message));
  }); 
}
