import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';
const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      }).catch(error => {
        console.log('error', error);
      })

  }
  const handleSignOut = () => {

    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      }).catch(error => {
        console.error(error);
      })
  }
  return (
    <div className="App">
      {
        user.email ? <button onClick={handleSignOut}>Sign Out</button> :
          <>
            <button onClick={handleGoogleSignIn}>Google sign In</button>
            <button onClick={handleGithubSignIn}>Github sign In</button>
          </>

      }
      <h1>{user.displayName}</h1>

      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
