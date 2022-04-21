import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class UpdateCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, reqBody) {
        this._reqBody = reqBody;
        this._token = token;
        console.log(this._token);
    }

    _createUpdateCourseRequest() {
        let req = axios.put(`${serverURL}/course/editCourse`, this._reqBody, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onUpdateCourseSuccess(res) {
        this._response.payload = { course: res.data };
        this._response.message = '  Course Updated!  ';

        return this._response;
    }

    _onUpdateCourseError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 404) {
            message = 'Course not found!';
        }
        else if (err['response'].status === 409) {
            message = 'Course Already Present !';
        } else {
            message = 'OPPS! Network error';
        }

        //payload is kept null
        this._response.message = message;

        console.log(`UpdateCourseError: ${status}`);
        return this._response;
    }


    static async updateCourse(reqBody) {
        let token = await Database.getToken();
        let api = new UpdateCourseAPI(token, reqBody);
        try {
            let httpRes = await api._createUpdateCourseRequest();
            let response = api._onUpdateCourseSuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`CourseAPI Update: Error Occured\n`); console.log(err);
            let errResponse = api._onUpdateCourseError(err);
            return errResponse;
        }
    }
}