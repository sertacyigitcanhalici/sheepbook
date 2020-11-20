import "./App.css";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Koyunlar from "./components/Koyunlar";
import Giris from "./components/Giris";

toast.configure();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isAuthenticated ? (
                <Koyunlar {...props} setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Redirect to="giris" />
              )
            }
          />
          <Route
            exact
            path="/giris"
            render={(props) =>
              !isAuthenticated ? (
                <Giris {...props} setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
