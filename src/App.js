import './styles/App.css';

import LoadingPage from './pages/LoadingPage';
import SignIn from './pages/SignIn';

import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './pages/Home';





function App() {
  const [user, loading] = useAuthState(auth);

  if(loading) return <LoadingPage />
  if(user)    return <Home />
 
  return <SignIn  />
}



export default App;
