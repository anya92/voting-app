import { firebaseApp, userRef } from '../firebase';

export function registerUser(email, password) {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then(user => saveUser(user))
}

function saveUser(user) {
  const { uid, email } = user;
  // saving user to database - uid as key
  return userRef.child(uid).set({ email });
}
