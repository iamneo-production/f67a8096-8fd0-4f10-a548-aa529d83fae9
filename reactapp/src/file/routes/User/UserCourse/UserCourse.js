import { useParams } from "react-router-dom";

import CourseView from "components/CourseView/CourseView";

import { onAcademyCourseSearch } from "routes/Admin/AdminCourse/AdminCourse";



export default function UserCourse(props) {

    let param = useParams();

    let onSearch = (searchTerm) => {
        let academyId = param['academyId'];
        return onAcademyCourseSearch(academyId, searchTerm);
    }

    return (
        <CourseView user onSearch={onSearch} />
    );
}