import React from "react";

export function Email(props) {
  let inputElement = (
    <input
      type="email"
      id="email"
      name="email"
      className="form-control"
      placeholder="Enter email"
      required
    />
  );

  return inputElement;
}

export function Username() {
  let inputElement = (
    <input
      type="text"
      id="username"
      name="username"
      className="form-control"
      placeholder="Enter Username"
      required
    />
  );

  return inputElement;
}

export function MobileNumber() {
  let inputElement = (
    <input
      type="text"
      id="mobileNumber"
      name="mobileNumber"
      className="form-control"
      maxLength="10"
      pattern="[6-9]{1}[0-9]{9}"
      placeholder="Enter Mobilenumber"
      
    />
  );

  return inputElement;
}

export function Password() {
  let inputElement = (
    <input
      type="password"
      id="password"
      name="password"
      className="form-control"
      placeholder="Password"
      required
    />
  );

  return inputElement;
}

export function ConfirmPassword() {
  let inputElement = (
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      className="form-control"
      placeholder="Confirm Password"
      
    />
  );

  return inputElement;
}
