import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class FetchCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, id) {
        this._token = token;
        //id is course id
        this._id = id;
    }

    //fetches all courses
    _createFetchAllCourseRequest() {
        let req = axios.get(`${serverURL}/course/viewCourse`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _createFetchCourseByAcademyIdReq = () => {
        //console.log(this._token);
        return axios.get(`${serverURL}/course/institute/${this._id}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
    }

    _createFetchCourseByCourseIdReq = () => {
        console.log(this._token);
        return axios.get(`${serverURL}/course/${this._id}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
    }

    _onFetchAllCourseSuccess(res) {
        this._response.payload = { course: res.data };
        this._response.message = 'All Course Fetched';

        return this._response;
    }


    _onFetchCourseByIdSuccess(res) {
        //console.log(this._id);
        this._response.payload = {
            course: res.data,
            statusCode: res.status
        };

        //console.log(this._response.payload.course);
        this._response.message = 'Courses Fetched';

        return this._response;
    }


    _onFetchAllCourseError(err) {
        let message;
        let status = err['response'].status;
        message = 'OPPS! Network error';

        //payload is kept null
        this._response.message = message;

        console.log(`FetchAllCourseError: ${status}`);
        return this._response;
    }

    _onFetchCourseByIdError(err) {
        let message;
        //console.log(err);
        let status = err['response'].status;

        if (status === 404) {
            message = 'Course Not Found !'
        } else {
            message = 'OPPS! Network error';
        }

        this._response.payload = { statusCode: status };
        this._response.message = message;

        console.log(`FetchCourseByIdError: ${status}`);
        return this._response;
    }


    static async fetchAllCourse() {
        let token = await Database.getToken();
        let api = new FetchCourseAPI(token);
        try {
            let httpRes = await api._createFetchAllCourseRequest();
            let response = api._onFetchAllCourseSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchCourseAPI: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchAllCourseError(err);
            return errResponse;
        }
    }


    static async fetchCourseByAcademyId(id) {
        let token = await Database.getToken();
        let api = new FetchCourseAPI(token, id);
        try {
            let httpRes = await api._createFetchCourseByAcademyIdReq();
            let response = api._onFetchCourseByIdSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchCourseAPI by Id: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchCourseByIdError(err);
            return errResponse;
        }
    }

    static async fetchCourseByCourseId(id) {
        let token = await Database.getToken();
        let api = new FetchCourseAPI(token, id);
        try {
            let httpRes = await api._createFetchCourseByCourseIdReq();
            let response = api._onFetchCourseByIdSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchCourseAPI by Id: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchCourseByIdError(err);
            return errResponse;
        }
    }

}