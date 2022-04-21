import axios from "axios";

import StudentView from "components/StudentView/StudentView";

import { serverURL } from "config/serverConfig";

import Database from "database/Database";

export let onEnrolledStudent = async (searchTerm) => {
    console.log(searchTerm);
    searchTerm = searchTerm || '';
    let sResults = [];
    try {
        sResults = await axios.get(`${serverURL}/Student/search?keyword=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${await Database.getToken()}`
            }
        }).then((resposne) => { return resposne.data });
        //console.log(sResults);
        return sResults;
    } catch (err) { }
}


export default function AdminAllStudents() {

    let getData = async () => {
        let view = [];
        try {
            view = await axios.get(`${serverURL}/Student/adminStudentView`, {
                headers: {
                    Authorization: `Bearer ${await Database.getToken()}`
                }
            }).then((resposne) => { return resposne.data });
            //console.log(view);
            return view;
        } catch (err) { }
    }

    return (<StudentView getData={getData} onSearch={onEnrolledStudent} />)
}