import axios from "axios";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LoadingSpinner from "./components/Home/LoadingSpinner/LoadingSpinner";
import { getDecodedUser } from "./components/Login/LoginManager";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { API_ROOT } from "./consts/consts";
import makeAPICalls from "./utilities/makeApiCalls";
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./components/Login/Login"));

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(getDecodedUser());
  const [selectedService, setSelectedService] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // axios
    //   .get(`${API_ROOT}isAdmin?email=${loggedInUser?.email}`)
    //   .then((res) => {
    //     setIsAdmin(res.data);
    //     setAdminLoading(false);
    //   })
    //   .catch((error) => toast.error("API ColdStart Error"));
    makeAPICalls(`isAdmin?email=${loggedInUser?.email}`, setIsAdmin, setAdminLoading);
  }, [loggedInUser?.email]);

  // const makeAPICalls = async (email) => {
  //   let success = false;
  //   let attempts = 0;

  //   while (!success && attempts < 10) {
  //     try {
  //       const response = await axios.get(`${API_ROOT}isAdmin?email=${email}`);
  //       if (response.status === 200) {
  //         success = true;
  //         // console.log("API call successful");
  //         setIsAdmin(response.data);
  //         setAdminLoading(false);
  //         // Process the data or update state
  //       } else {
  //         // console.log("API call failed");
  //         attempts++;
  //       }
  //     } catch (error) {
  //       // console.error("API call failed with error:", error);
  //       attempts++;
  //     }
  //   }

  //   if (!success) {
  //     toast.error("API ColdStart Issue. Please Reload");
  //     // Handle the case where the API call was not successful after multiple attempts
  //   }
  // };

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isAdmin, selectedService, setSelectedService }}>
      <Router>
        <Toaster />
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route exact path="/">
              {adminLoading ? <LoadingSpinner /> : <Home />}
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
