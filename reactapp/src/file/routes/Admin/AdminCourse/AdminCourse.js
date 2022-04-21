import axios from "axios";
import { useParams } from "react-router-dom";

import { serverURL } from "config/serverConfig";

import CourseView from "components/CourseView/CourseView";

import Database from "database/Database";


export async function onAcademyCourseSearch(academyId, searchTerm) {
    searchTerm = searchTerm || null;

    let sResults = [];

    try {
        if (searchTerm) {

            sResults = await axios.get(`${serverURL}/course/institute/${academyId}/search/${searchTerm}`, {
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

export default function AdminCourse() {
    let param = useParams();

    let onSearch = (searchTerm) => {
        let academyId = param['academyId'];
        return onAcademyCourseSearch(academyId, searchTerm);
    }

    return (<CourseView admin onSearch={onSearch} />)
}