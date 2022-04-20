import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class ApplyCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, reqBody) {
        this._token = token;
        this._reqBody = reqBody;
    }

    _createApplyCourseRequest() {
        console.log(this._reqBody);
        let req = axios.post(`${serverURL}/appliedcourse/addAppliedCourse`, this._reqBody, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onApplyCourseSuccess(res) {
        this._response.payload = { course: res.data };
        this._response.message = '  Course Enrolled!  ';

        return this._response;
    }

    _onApplyCourseError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 409) {
            message = 'Course Already Enrolled !'
        } else {
            message = 'OPPS! Network error';
        }

        //payload is kept null
        this._response.message = message;

        console.log(`Adding Course: Failed ${status}`);
        return this._response;
    }


    static async apply(reqBody) {
        let token = await Database.getToken();
        let api = new ApplyCourseAPI(token, reqBody);
        try {
            let httpRes = await api._createApplyCourseRequest();
            let response = api._onApplyCourseSuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`CourseAPI Add: Error Occured\n`); console.log(err);
            let errResponse = api._onApplyCourseError(err);
            return errResponse;
        }
    }
}