import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class AddCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, reqBody) {
        this._token = token;
        this._reqBody = reqBody;
    }

    _createAddCourseRequest() {
        let req = axios.post(`${serverURL}/course/addCourse`, this._reqBody, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onAddCourseSuccess(res) {
        this._response.payload = { course: res.data };
        this._response.message = '  Course Added!  ';

        return this._response;
    }

    _onAddCourseError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 409) {
            message = 'Course Already Present !'
        } else {
            message = 'OPPS! Network error';
        }

        //payload is kept null
        this._response.message = message;

        console.log(`Adding Course: Failed ${status}`);
        return this._response;
    }


    static async addCourse(reqBody) {
        let token = await Database.getToken();
        let api = new AddCourseAPI(token, reqBody);
        try {
            let httpRes = await api._createAddCourseRequest();
            let response = api._onAddCourseSuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`CourseAPI Add: Error Occured\n`); console.log(err);
            let errResponse = api._onAddCourseError(err);
            return errResponse;
        }
    }
}