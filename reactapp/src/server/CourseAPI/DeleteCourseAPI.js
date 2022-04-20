import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class DeleteCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, id) {
        this._id = id;
        this._token = token;
    }

    _createDelCourseRequest() {
        let req = axios.delete(`${serverURL}/course/deleteCourse/${this._id}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onDelCourseSuccess(res) {
        this._response.payload = true;
        this._response.message = '  Course Deleted!  ';

        return this._response;
    }

    _onDelCourseError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 404) {
            message = 'Course Not Found !'
        } else {
            message = 'OPPS! Network error';
        }

        this._response.payload = false;
        this._response.message = message;

        console.log(`Adding Deletion: Failed ${status}`);
        return this._response;
    }


    static async delCourse(id) {
        let token = await Database.getToken();
        let api = new DeleteCourseAPI(token, id);
        try {
            let httpRes = await api._createDelCourseRequest();
            let response = api._onDelCourseSuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`CourseAPI Add: Error Occured\n`); console.log(err);
            let errResponse = api._onDelCourseError(err);
            return errResponse;
        }
    }
}