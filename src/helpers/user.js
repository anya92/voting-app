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
