import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';
//pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import LoggedinHomePage from './pages/LoggedinHomePage';
// import Page404 from './pages/404Page';
//hooks
// import CheckAuth from './hooks/checkauth';
import {useAuthContext} from './Contexts/useAuthContext'


import './App.css';

function App() {

  const {user} = useAuthContext();
  // const user = CheckAuth();
  let idtoken = user ?  user.token : '404';
  if(idtoken!=='404') idtoken = idtoken.slice(0,8)
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
            path="/"
            element={!user ? <HomePage/> : <Navigate to={`user/${idtoken}`}/>}> 
            </Route>
            <Route
            path="/Login"
            element={!user ? <LoginPage/> : <Navigate to={`user/${idtoken}`}/>}>
            </Route>
            <Route
            path="/Signup"
            element={!user ? <Signup/> : <Navigate to={`user/${idtoken}`}/>}>
            </Route>
            <Route
            path={`user/${idtoken}`}
            element={ <LoggedinHomePage/>}>

            </Route>
            
            <Route
            path="*"
            element={<Navigate to="/"/>}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
