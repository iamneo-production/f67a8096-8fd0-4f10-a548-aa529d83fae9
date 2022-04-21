import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class AddStudentAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, reqBody) {
        this._token = token;
        this._reqBody = reqBody;
    }

    _createAddStudentRequest() {
        let req = axios.post(`${serverURL}/Student/addStudent`, this._reqBody, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onAddStudentSuccess(res) {
        this._response.payload = { course: res.data };
        this._response.message = '  Student Added!  ';

        return this._response;
    }

    _onAddStudentError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 409) {
            message = 'Student Already Present !';
            this._response.payload = err['response'].data;
        } else {
            message = 'OPPS! Network error';
        }


        this._response.isError = true;
        this._response.message = message;
        
        console.log(err['response']);

        console.log(`Adding Student: Failed ${status}`);
        return this._response;
    }


    static async addStudent(reqBody) {
        let token = await Database.getToken();
        let api = new AddStudentAPI(token, reqBody);
        try {
            let httpRes = await api._createAddStudentRequest();
            let response = api._onAddStudentSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`StudentAPI Add: Error Occured\n`); //console.log(err);
            let errResponse = api._onAddStudentError(err);
            return errResponse;
        }
    }
}