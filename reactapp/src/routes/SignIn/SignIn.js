import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';

import signInHandler from '../../Handler/SignInHandler/SignInHandler.js';

import * as Input from "components/LoginInputField/InputField.js";
import "assets/css/login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignInError from "Handler/SignInHandler/SignInError.js";
import Database from "database/Database";
import UserDetailsAPI from "server/UserDetailsAPI/UersDetailsAPI.js";

function SignIn(props) {
  let formRef = useRef(null);

  let navigate = useNavigate();

  let state = useSelector((state) => {
    if (state) {
      return state;
    } else {
      return 'SignIn component: TokenStore is accessed using useSelector, state is null';
    }
  });

  useEffect(() => {
    Database.getToken().then((token) => { console.log(token) });
  });

  let formDetails = () => {
    let formData = new FormData(formRef.current);
    let credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    return credentials;
  }

  let onSignInSuccess = async (signInMsgPacket) => {
    try {
      console.log(signInMsgPacket.payload.token);
      await Database.setToken(signInMsgPacket.payload.token);
      await Database.setCurrUserEmail(signInMsgPacket.payload.email);
      let userDetailsRes = await UserDetailsAPI.fetch(signInMsgPacket.payload.email);
      await Database.setUserId(userDetailsRes.payload.id);

      if (userDetailsRes.payload.authority.toLowerCase() === 'user') {
        setTimeout(() => { navigate('/user/academy'); }, 2000);
      } else {
        setTimeout(() => { navigate('/admin/academy'); }, 2000);
      }
      toast(signInMsgPacket.message);

    } catch (err) {
      toast('Opps! could not save credentials');
    }
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
      <form id="loginForm" ref={formRef} onSubmit={onSubmit}>
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
