import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class DeleteAcademyAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, id) {
        this._id = id;
        this._token = token;
    }

    _createDelAddAcademyRequest() {
        let req = axios.delete(`${serverURL}/institute/deleteInstitute/${this._id}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onDelAcademySuccess(res) {
        this._response.payload = true;
        this._response.message = '  Academy Deleted!  ';

        return this._response;
    }

    _onDelAcademyError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 404) {
            message = 'Academy Not Found !'
        } else {
            message = 'OPPS! Network error';
        }

        this._response.payload = false;
        this._response.message = message;

        console.log(`Adding Deletion: Failed ${status}`);
        return this._response;
    }


    static async delAcademy(id) {
        let token = await Database.getToken();
        let api = new DeleteAcademyAPI(token, id);
        try {
            let httpRes = await api._createDelAddAcademyRequest();
            let response = api._onDelAcademySuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`AcademyAPI Add: Error Occured\n`); console.log(err);
            let errResponse = api._onDelAcademyError(err);
            return errResponse;
        }
    }
}