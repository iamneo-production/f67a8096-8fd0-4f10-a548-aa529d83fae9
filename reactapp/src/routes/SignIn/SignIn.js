import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import signInHandler from '../../Handler/SignInHandler/SignInHandler.js';

import * as Input from "components/LoginInputField/InputField.js";
import "assets/css/login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInError from "Handler/SignInHandler/SignInError.js";



function SignIn(props) {
  let formRef = useRef(null);

  let navigate = useNavigate();

  let mainStoreDispatch = useDispatch();

  let userDetails = useSelector((state) => {
    if (state) {
      return state.userDetails;
    } else {
      return 'SignIn component: TokenStore is accessed using useSelector, state is null';
    }
  });

  useEffect(() => {
    console.log('SignIn Component: state');
    console.log(userDetails);
  });

  let formDetails = () => {
    let formData = new FormData(formRef.current);
    let credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    return credentials;
  }

  let onSignInSuccess = (signInMsgPacket) => {
    mainStoreDispatch({
      type: 'userDetails',
      payload: signInMsgPacket.payload
    });
    toast(signInMsgPacket.message);
  }


  let onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let credentials = formDetails();

    try {
      await signInHandler(credentials, onSignInSuccess);
    } catch (err) {
      if (err instanceof SignInError) {
        toast(err.message);
      }
    }
  };

  let signUpRedirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/");
  };

  return (
    <>
      <form id="loginForm" ref={formRef} onSubmit={onSubmit.bind(this)}>
        <h3 className="text-white">Login</h3>
        <div className="form-item">
          <div className="form-group">
            <div className="form-group">{<Input.Email />}</div>
            <div className="form-group">{<Input.Password />}</div>
            <div className="text-center">
              <input
                type="submit"
                id="loginButton"
                className="btn btn-primary"
                value="Login"
                onChange={() => { return 'not be admintired'; }}
              />
            </div>
            <div className="signupRedirection text-center text-black">
              New user?{" "}
              <span id="signupLink" onClick={signUpRedirection.bind(this)}>
                Register
              </span>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false} />
    </>
  );
}

export default SignIn;
