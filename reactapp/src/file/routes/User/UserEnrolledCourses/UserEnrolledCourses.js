import axios from "axios";

import { serverURL } from "config/serverConfig";

import CourseView from "components/CourseView/CourseView";

import Database from "database/Database";

export async function onUserEnrolledCourseSearch(searchTerm) {
    searchTerm = searchTerm || null;

    let userId = await Database.getUserId();

    let sResults = [];

    try {
        if (searchTerm) {

            sResults = await axios.get(`${serverURL}/course/searchUserEnrolledCourse/userId/${userId}/search/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${await Database.getToken()}`
                }
            }).then((resposne) => { return resposne.data });

        } else {

            sResults = null;
        }

        console.log(sResults);

        return sResults;
    } catch (err) { }
}

export default function UserCourse(props) {


    return (
        <CourseView user allEnrolledCourse onSearch={onUserEnrolledCourseSearch} />
    );
}