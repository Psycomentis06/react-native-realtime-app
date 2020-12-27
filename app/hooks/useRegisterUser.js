import {useState, useEffect} from 'react';
import firebase from '../firebase.config';
import {AVATARS} from './__usersAvatars';
export default function useRegisterUser({email, password, name}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  useEffect(() => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);
        // user created now we save other data in realtime database
        firebase
          .database()
          .ref('/users')
          .child(user.user.uid)
          .set({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            username: name,
            email: user.user.email,
            avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  return {loading, error, user};
}
