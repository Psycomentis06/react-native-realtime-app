import {useEffect, useState} from 'react';
import firebase from '../firebase.config';
export default function useLoginUser({email, password}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => setUser(user))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return {loading, error, user};
}
