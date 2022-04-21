import axios from "axios";

import Database from "database/Database";

import { serverURL } from "config/serverConfig";

export default class UserDetailsAPI {
  _email;

  _response = {
    payload: null,
    message: null,
  };

  constructor(token, email) {
    this._token = token;
    this._email = email;
  }

  static _api(token, email) {
    let api = new UserDetailsAPI(token, email);
    return api;
  }

  _createRequest() {
    let res = axios.get(`${serverURL}/user/email/${this._email}`, {
      headers: {
        Authorization: `Bearer ${this._token}`
      }
    });

    return res;
  }

  _onFetchSuccess(res) {
    let msgPacket = {
      id: res.data.id,
      name: res.data.user_name,
      email: res.data.email,
      authority: res.data.authorities[0].authority,
      mobileNo: res.data.mobileNo,
    };

    this._response.payload = msgPacket;
    this._response.message = 'Fetched User details';

    console.log(`UserDetailsAPI: User details`);
    console.log(this._response);
    return this._response;
  }

  _onFetchError(err) {
    let status = err['response'].status;
    let message = 'Failed to fetch User details';

    this._response.message = message;
    this._response.hasError = true;

    console.log(`UserDetailsAPI: Failed to fetch details ${status}`);
    return this._response;
  }

  static async fetch(email) {
    let token = await Database.getToken();
    let api = UserDetailsAPI._api(token, email);
    try {
      let httpRes = await api._createRequest();
      let response = api._onFetchSuccess(httpRes);
      return response;
    } catch (err) {
      console.log(`UserDetailsAPI: Error Occured`);
      console.log(err);
      let errResponse = api._onFetchError(err);
      return errResponse;
    }
  }

}