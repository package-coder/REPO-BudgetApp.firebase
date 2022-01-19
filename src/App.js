import './App.css';

import Budgets from './components/Budgets';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import LoadingPage from './components/LoadingPage';

import { app } from './firebase'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';





function App() {
  const [user, loading] = useAuthState(getAuth());

  if(loading) return <LoadingPage />
  if(user) return <div>
    <SignOut />
    <Budgets user={user}/>
  </div>
  

  return <SignIn  />
}



export default App;
