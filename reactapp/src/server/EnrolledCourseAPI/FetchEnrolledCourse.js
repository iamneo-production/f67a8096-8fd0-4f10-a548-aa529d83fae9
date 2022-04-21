import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class FetchEnrolledCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, userId) {
        this._token = token;
        //userId is course userId
        this._userId = userId;
    }

    //fetches all courses
    _createFetchEnrolledCourseByUserId() {
        let req = axios.get(`${serverURL}/enrolledcourse/enrolledCourses/${this._userId}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _createFetchEnrollementStatus(courseId) {
        //console.log(this._token);
        //this._courseId = courseId;
        return axios.get(`${serverURL}/enrolledcourse/enrolledCourses/${this._userId}/${courseId}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
    }

    _onFetchEnrolledCourseByUserIdSuccess(res) {
        this._response.payload = { course: res.data };
        this._response.message = 'User EnrolledCourse Fetched';

        return this._response;
    }


    _onFetchEnrolledCourseByUserIdError(err) {
        let message;
        let status = err['response'].status;
        message = 'Could not your fetch courses';

        //payload is kept null
        this._response.message = message;

        console.log(`_onFetchEnrolledCourseByUserIdError: ${status}`);
        return this._response;
    }


    _onFetchEnrollementStatusSuccess(res) {
        //console.log(this._userId);
        this._response.payload = res.data;
        //console.log(this._userId + '/' + this._courseId + ' ' + this._response.payload);
        this._response.message = 'Enrollment Status fetched';

        return this._response;
    }



    _onFetchEnrollementStatusError(err) {
        let message;
        let status = err['response'].status;
        message = 'Enrollement Status not found';

        //payload is kept null
        this._response.message = message;

        console.log(`_onFetchEnrollementStatusError: ${status}`);
        return this._response;
    }


    static async fetchEnrolledCourseByUserId(userId) {
        let token = await Database.getToken();
        let api = new FetchEnrolledCourseAPI(token, userId);
        try {
            let httpRes = await api._createFetchEnrolledCourseByUserId();
            let response = api._onFetchEnrolledCourseByUserIdSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchEnrolledCourseAPI: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchEnrolledCourseByUserIdError(err);
            return errResponse;
        }
    }


    static async fetchEnrollementStatus(userId, courseId) {
        let token = await Database.getToken();
        let api = new FetchEnrolledCourseAPI(token, userId);
        try {
            let httpRes = await api._createFetchEnrollementStatus(courseId);
            let response = api._onFetchEnrollementStatusSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchEnrolledCourseAPI by Id: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchEnrollementStatusError(err);
            return errResponse;
        }
    }

}