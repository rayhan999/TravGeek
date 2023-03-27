import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import "./Login.css";
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, setJWTToken, signInWithEmailAndPassword } from "./LoginManager";
// import { Cookie } from 'express-session';

const Login = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [signup, setSignup] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const { register: registerSignIn, handleSubmit: handleSignIn } = useForm();
  const { register: registerSignUp, handleSubmit: handleSignUp } = useForm();

  const history = useHistory();
  const { pathname, ...location } = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => pathname === "/login" && setShowModal(true), [pathname]);
   useEffect(() => {
     alert('Click SUBMIT to login as admin. Otherwise signup with google to login as user.')
   }, [])
   

  const googleSignIn = () => {
    initializeLoginFramework();
    const loading = toast.loading("Please wait...");
    handleGoogleSignIn()
      .then((res) => {
        toast.dismiss(loading);
        handleResponse(res);
      })
      .catch((err) => {
        toast.dismiss(loading);
        toast.error(err.message);
      });
  };

  const onSubmit = (data) => {
    initializeLoginFramework();
    const loading = toast.loading("Please wait...");
    const { name, email, password } = data;

    if (newUser && name && email && password) {
      createUserWithEmailAndPassword(name, email, password)
        .then((res) => {
          console.log(res);
          res.name = name;
          toast.dismiss(loading);
          handleResponse(res);
        })
        .catch((err) => {
          toast.dismiss(loading);
          toast.error(err.message);
        });
    }

    if (!newUser && email && password) {
      signInWithEmailAndPassword(email, password)
        .then((res) => {
          toast.dismiss(loading);
          handleResponse(res);
        })
        .catch((err) => {
          toast.dismiss(loading);
          toast.error(err.message);
        });
    }
  };

  const handleResponse = (res) => {
    setLoggedInUser(res);
    setJWTToken();
    setShowModal(false);
    history.replace(from);
    toast.success("Successfully Logged In!");
  };

  const handleToggle = () => {
    setSignup(!signup);
    setNewUser(!newUser);
  };
  const handlePassShow = () => {
    // console.log("asd");
    setSeePassword(!seePassword);
  };
  return (
    <section className="loginSection">
      <div className={signup ? "container active" : "container"}>
        <div className="user signinBx">
          <div className="imgBx">
            <img className="img-fluid" src="https://image.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg" alt="" />
           
          </div>
          <div className="formBx">
            <form onSubmit={handleSignIn(onSubmit)}>
              <h2>Sign In</h2>
              <div className="input-group with-icon icon-left">
                <input
                  className="form-control rounded"
                  name="username"
                  placeholder="Email"
                  defaultValue="admin@xyz.com"
                  {...registerSignIn("email", { required: true })}
                  type="email"
                />

                <p>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </p>
              </div>
              <div className="input-group with-icon icon-left">
                <input
                  className="form-control rounded"
                  name="password"
                  placeholder="Password"
                  defaultValue="adminxyz"
                  {...registerSignIn("password", { required: true })}
                  type={seePassword ? "text" : "password"}
                />
                <p>
                  <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
                </p>
              </div>
              <p className="see-pass">
                <FontAwesomeIcon icon={seePassword ? faEyeSlash : faEye} className="see-pass-icon" onClick={handlePassShow}></FontAwesomeIcon>
              </p>
              <input type="submit" className="btn btn-main btn-block mt-4" />
              <p className="signup">
                Don't have an account ?<span onClick={handleToggle}>Sign Up.</span>
              </p>
            </form>
            <button className="btn btn-danger rounded-5 btn-block" onClick={googleSignIn}>
              <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> &nbsp; Sign In with Google
            </button>
          
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={handleSignUp(onSubmit)}>
              <div className="input-group with-icon icon-left">
                <input className="form-control rounded" placeholder="UserName" {...registerSignUp("name", { required: true })} type="text" />
                <p>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </p>
              </div>
              <div className="input-group with-icon icon-left">
                <input className="form-control rounded" placeholder="Email" {...registerSignUp("email", { required: true })} type="email" />
                <p>
                  <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                </p>
              </div>
              <div className="input-group with-icon icon-left">
                <input className="form-control rounded" placeholder="Password" {...registerSignUp("password", { required: true })} type="password" />

                <p>
                  <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
                </p>
              </div>
              <input type="submit" className="btn btn-main btn-block" name="" value="Sign Up" />
              <p className="signup">
                Already have an account ?<span onClick={handleToggle}>Sign in.</span>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
