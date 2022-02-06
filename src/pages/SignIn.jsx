import React from 'react';
import { Container, Button } from "react-bootstrap";
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { auth } from '../firebase';

import '../styles/SignIn.css';

function SignIn() {
    const { signInUserWithGoogle } = useFirebaseAuth(auth);

  return (
      <>
        <Container className='signin-page d-flex justify-content-center align-items-center'>
            <section className='p-5 h-50 d-flex flex-column justify-content-between align-items-center'>
                <h1 className='heading'>Budget App</h1>
                <Button onClick={signInUserWithGoogle}>Sign In With Google</Button>
            </section>
        </Container>
      </>
  );
}

export default SignIn;
