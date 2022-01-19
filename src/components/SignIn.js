import React from 'react';
import { getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
} from 'firebase/auth';

import { Button } from 'react-bootstrap'
  

export default function SignIn() {
    function signInWithGoogle(){
        signInWithPopup(getAuth(), new GoogleAuthProvider())
          .then(result => {
            console.log(result.user);
          })
          .catch(console.log);
    
      }
    
      return <Button onClick={signInWithGoogle}>Sign In With Google</Button>
}
