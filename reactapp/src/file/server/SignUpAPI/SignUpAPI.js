import axios from "axios";

import { serverURL } from "config/serverConfig";

export default class SignUpAPI {
  _credentials;

  _response = {
    isCreated: false,
    message: null,
  }

  constructor(credentials) {
    this._credentials = {
      username: credentials.username,
      email: credentials.email,
      mobileNo: credentials.mobileNumber,
      password: credentials.password,
    };
  }

  static _api(credentials) {
    let api = new SignUpAPI(credentials);
    return api;
  }

  _createRequest() {
    let req = axios.post(`${serverURL}/user/signup`, this._credentials);
    return req;
  }

  _onSuccess() {
    this._response.isCreated = true;
    this._response.message = 'Welcome to Boxing Academy';
    return this._response;
  }

  _onError(err) {
    let status = err['response'].status;
    let message = 'Unhandled Status Code in SignUpAPI';

    if (status === 409) {
      message = err['response'].data.message;
    }
    else if (status === 500) {
      message = 'OOPS! Network Error';
    }

    this._response.message = message;

    console.log(`SignUpAPI: Failed ${status}`);
    return this._response;
  }

  static async createUser(credentials) {
    let api = SignUpAPI._api(credentials);
    try {
      let httpRes = await api._createRequest();
      let response = api._onSuccess(httpRes);
      return response;
    } catch (err) {
      console.log(`SignUpAPI: Error Occured`);
      console.log(err);
      let errResponse = api._onError(err);
      return errResponse;
    }
  }

}