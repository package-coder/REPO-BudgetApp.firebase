import logo from './logo.svg';
import './App.css';

import BudgetCard from './components/BudgetCard';
import Budgets from './components/Budgets';
import { Button, Container, ProgressBar, Stack } from 'react-bootstrap';

import { initializeApp } from "firebase/app";
import { getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import { useState } from 'react';


const app = initializeApp({
  apiKey: "AIzaSyA82nT3rO8xM7I1wUnewokwINFM8WoQDE8",
  authDomain: "demos-99513.firebaseapp.com",
  projectId: "demos-99513",
  storageBucket: "demos-99513.appspot.com",
  messagingSenderId: "565290370696",
  appId: "1:565290370696:web:1b06acf90d7c9868ee413d",
  measurementId: "G-PY9M0F2BQ0"
})


function App() {
  const [user, loading] = useAuthState(getAuth());

  if(loading){
    return <h1>Loading</h1>
  }
  if(user){
    return <div>
      <SignOut />
      <Budgets user={user} />
    </div>
  }

  return <SignIn  />
}

function SignIn(){


  
  function signInWithGoogle(){
    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(credential, token);
      })
      .catch(console.log);

  }

  return <Button onClick={signInWithGoogle}>Sign In With Google</Button>
}

function SignOut(){
  return <Button onClick={() => signOut(getAuth())}>Sign Out</Button>
}

export default App;
