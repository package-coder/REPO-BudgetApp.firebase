import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap'


export default function SignOut() {
  return <Button onClick={() => signOut(getAuth())}>Sign Out</Button>
}
