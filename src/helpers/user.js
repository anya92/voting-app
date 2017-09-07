import * as firebase from 'firebase';
import { firebaseApp, userRef } from '../firebase';

export function updateUser(displayName, photoURL, history) {
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
    }).then(() => history.push('/profile'));
  })
}

function reauthenticateUser(email, password) {
  const user = firebaseApp.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  return user.reauthenticateWithCredential(credential);
}

export function changeEmail(email, newEmail, password) {
  const user = firebaseApp.auth().currentUser;
  return new Promise((resolve, reject) => {
    // user needs to be reauthenticated
    reauthenticateUser(email, password).then(() => {

      user.updateEmail(newEmail).then(() => {
        const { uid, email } = user;
        // save new email in db
        userRef.child(uid).update({ email });
        resolve('Email został zmieniony pomyślnie.');

      }).catch(error => reject(error.message));
    }).catch(error => reject(error.message));
  }); 
}

export function changePassword(email, password, newPassword) {
  const user = firebaseApp.auth().currentUser;
  
  return new Promise((resolve, reject) => {
    // user needs to be reauthenticated
    reauthenticateUser(email, password).then(() => {

      user.updatePassword(newPassword).then(() => {
        resolve('Hasło zostało zmienione.');
      }).catch(error => reject(error.message));
    }).catch(error => reject(error.message));
  });
}
