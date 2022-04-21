import FetchEnrolledCourseAPI from "./FetchEnrolledCourse";

export default class EnrolledCourseAPI {

    static fetchByUserId(userId) {
        return FetchEnrolledCourseAPI.fetchEnrolledCourseByUserId(userId);
    }

    static getEnrollmentStatus(userId, courseId) {
        return FetchEnrolledCourseAPI.fetchEnrollementStatus(userId, courseId);
    }

}

