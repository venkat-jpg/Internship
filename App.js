import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import { useState } from "react";
import { auth, provider } from "./firebase"; 

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL}/>
          <div className="App">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <div className="loginWarp">
          <img src="https://seeklogo.net/wp-content/uploads/2020/11/google-drive-logo.png" alt="Google Drive Logo" />
          <button onClick={signIn}>Login to Google Drive Clone</button>
        </div>
      )}
    </>
  );
}

export default App;
