import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class UpdateAcademyAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, reqBody) {
        this._reqBody = reqBody;
        this._token = token;
        console.log(this._token);
    }

    _createUpdateAcademyRequest() {
        let req = axios.put(`${serverURL}/institute/editInstitute`, this._reqBody, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onUpdateAcademySuccess(res) {
        this._response.payload = { academy: res.data };
        this._response.message = '  Academy Updated!  ';

        return this._response;
    }

    _onUpdateAcademyError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 404) {
            message = 'Academy not found!';
        }
        else if (err['response'].status === 409) {
            message = 'Academy Already Present !';
        } else {
            message = 'OPPS! Network error';
        }

        //payload is kept null
        this._response.message = message;

        console.log(`Adding Academy: Failed ${status}`);
        return this._response;
    }


    static async updateAcademy(reqBody) {
        let token = await Database.getToken();
        let api = new UpdateAcademyAPI(token, reqBody);
        try {
            let httpRes = await api._createUpdateAcademyRequest();
            let response = api._onUpdateAcademySuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`AcademyAPI Update: Error Occured\n`); console.log(err);
            let errResponse = api._onUpdateAcademyError(err);
            return errResponse;
        }
    }
}