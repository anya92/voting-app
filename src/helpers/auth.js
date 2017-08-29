import { firebaseApp, userRef } from '../firebase';

export function registerUser(email, password) {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then(user => saveUser(user));
}

function saveUser(user) {
  const { uid, email } = user;
  // saving user to database - uid as key
  return userRef.child(uid).set({ email });
}

export function loginUser(email, password) {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
}

export function sendReset(email) {
  return firebaseApp.auth().sendPasswordResetEmail(email);
}

export function signOut() {
  firebaseApp.auth().signOut();
}
