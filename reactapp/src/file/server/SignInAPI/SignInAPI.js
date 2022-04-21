import axios from "axios";

import { serverURL } from "config/serverConfig";

export default class SignInAPI {
  _credentials;

  _response = {
    payload: null,
    message: null,
  };

  constructor(credentials) {
    this._credentials = {
      email: credentials.email,
      password: credentials.password,
    };
  }

  static _api(credentials) {
    let api = new SignInAPI(credentials);
    return api;
  }

  _createRequest() {
    let req = axios.post(`${serverURL}/user/signin`, this._credentials);
    return req;
  }

  _onSuccess(res) {
    let token = res.data.token;

    this._response.payload = { token: token, email: this._credentials.email };
    this._response.message = 'Welcome to boxing academy';

    return this._response;
  }

  _onError(err) {
    let message;
    let status = err['response'].status;

    if (err['response'].status === 401) {
      message = 'Invalid Credentials'
    } else {
      message = 'OPPS! Network error';
    }

    //payload is kept null
    this._response.message = message;

    console.log(`SignInAPI: Failed ${status}`);
    return this._response;
  }

  static async signIn(credentials) {
    let api = SignInAPI._api(credentials);
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
