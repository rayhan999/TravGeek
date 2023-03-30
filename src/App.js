import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import LoadingSpinner from "./components/Home/LoadingSpinner/LoadingSpinner";
import { getDecodedUser } from "./components/Login/LoginManager";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./components/Login/Login'));

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(getDecodedUser());
  const [selectedService, setSelectedService] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const callAPI = async () =>{
    const response = await axios.get(`https://trav-geek-mern-server.vercel.app/isAdmin?email=${loggedInUser?.email}`);
    const data = response.data;
    setIsAdmin(data);
    setAdminLoading(false);
    console.log(data); // Do something with the data
  }
   function fetchData() {
    try {
      callAPI()
    } catch (error) {
      console.error(error);
      callAPI()
    }
  }

  useEffect(() => {
    // axios.get(`https://trav-geek-mern-server.vercel.app/isAdmin?emaill=${loggedInUser?.email}`)
    //   .then(res => {
    //     setIsAdmin(res.data);
    //     setAdminLoading(false);
    //   })
    //   .catch(error => toast.error('CORS Error'))
      fetchData();
  }, [loggedInUser?.email]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isAdmin, selectedService, setSelectedService }}>
      <Router>
        <Toaster />
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/dashboard/:panel">
              <Dashboard adminLoading={adminLoading} />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
