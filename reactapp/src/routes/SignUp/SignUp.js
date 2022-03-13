import React, { useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import signUpHandler from "Handler/SignUpHandler/SignUpHanlder.js";
import SignUpError from "Handler/SignUpHandler/SignUpError.js";

import * as Input from "../../components/LoginInputField/InputField.js";
import "assets/css/login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function SignUp(props) {
  let formRef = useRef(null);
  let navigate = useNavigate();

  let mainStoreDispatch = useDispatch();

  let userDetails = useSelector((state) => {
    if (state) {
      return state.userDetails;
    } else {
      return 'SignUp component: TokenStore is accessed using useSelector, state is null';
    }
  });

  useEffect(() => {
    console.log('SignIn Component: state');
    console.log(userDetails);
  });

  let formDetails = () => {
    let formData = new FormData(formRef.current);
    //credentials being returned
    return {
      email: formData.get("email"),
      username: formData.get("username"),
      mobileNumber: formData.get("mobileNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
  }

  let onSignUpSuccess = (signInMsgPacket) => {
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

    if (credentials.password === credentials.confirmPassword) {
      try {
        await signUpHandler(credentials, onSignUpSuccess);
      } catch (err) {
        if (err instanceof SignUpError) {
          toast(err.message);
        }
      }
    } else {
      toast('Mismatch: Password and Confirm Passoword');
    }
  };

  let signInRedirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/signIn");
  };

  return (
    <>
      <form id="loginForm" ref={formRef} onSubmit={onSubmit.bind(this)}>
        <h3 className="text-white">Register</h3>
        <div className="form-item">
          <div className="form-group">{<Input.Email />}</div>
          <div className="form-group">{<Input.Username />}</div>
          <div className="form-group">{<Input.MobileNumber />}</div>
          <div className="form-group">{<Input.Password />}</div>
          <div className="form-group">{<Input.ConfirmPassword />}</div>
          <div className="text-center">
            <input
              type="Submit"
              className="btn btn-primary"
              id="submitButton"
              value="Submit"
              //onChange is added to suppress form uncontrollable due value provided in submit input
              onChange={() => { }}
            />
          </div>
          <div className="signinRedirection text-center text-black">
            Already a user?{" "}
            <span id="signinLink" onClick={signInRedirection.bind(this)}>
              Login
            </span>
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

export default SignUp;
