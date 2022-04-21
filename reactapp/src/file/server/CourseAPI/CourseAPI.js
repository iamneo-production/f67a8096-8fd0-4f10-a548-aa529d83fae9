import AddCourseAPI from "./AddCourseAPI";
import ApplyCourseAPI from "./ApplyCourseAPI";
import DeleteCourseAPI from "./DeleteCourseAPI";
import FetchCourseAPI from "./FetchCourseAPI";
import UpdateCourseAPI from "./UpdateCourseAPI";


export default class CourseAPI {

    static fetchAll() {
        return FetchCourseAPI.fetchAllCourse();
    }

    static fetchByAcadmeyId(id) {
        return FetchCourseAPI.fetchCourseByAcademyId(id);
    }

    static fetchByCourseId(id) {
        return FetchCourseAPI.fetchCourseByCourseId(id);
    }

    static add(reqBody) {
        return AddCourseAPI.addCourse(reqBody);
    }

    static update(reqBody) {
        return UpdateCourseAPI.updateCourse(reqBody);
    }

    static delete(id) {
        return DeleteCourseAPI.delCourse(id);
    }

    static applyCourse(reqBody) {
        return ApplyCourseAPI.apply(reqBody);
    }

}

