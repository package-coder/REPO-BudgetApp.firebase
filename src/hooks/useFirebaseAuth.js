import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
} from 'firebase/auth';


function useFirebaseAuth(auth) {
    function signInUserWithGoogle(){
        signInWithPopup(auth, new GoogleAuthProvider())
          .then(result => {
            console.log(result.user);
          })
          .catch(console.log);
    }

    function userSignOut(){
      signOut(auth);
    }

    return { signInUserWithGoogle, userSignOut }
}

export default useFirebaseAuth;
