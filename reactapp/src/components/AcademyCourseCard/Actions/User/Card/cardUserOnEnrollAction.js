import axios from "axios";
import { toast } from "react-toastify";

import Database from "database/Database";

import { serverURL } from "config/serverConfig";

import EnrolledCourseAPI from "server/EnrolledCourseAPI/EnrolledCourseAPI.js";
import { applyCourse, serverFormatApplyCourse } from "routes/User/UserEnrollCourse/UserEnrollCourse";

export async function cardUserOnEnrollCourseAction(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();

    let cardProp = state.cardProp;

    try {
        let courseId = cardProp.id;
        let userId = await Database.getUserId();
        let enrollmentStatus = await EnrolledCourseAPI.getEnrollmentStatus(userId, courseId).then((response) => response.payload);
        await axios.get(`${serverURL}/user/getStudentId?userEmail=${await Database.getCurrUserEmail()}`, {
            headers: {
                Authorization: `Bearer ${await Database.getToken()}`
            }
        }).then(
            async (response) => {
                let studentId = parseInt(response.data);
                if (enrollmentStatus) {
                    console.log(enrollmentStatus);
                    toast('You are already enrolled!');
                } else {
                    if (Object.is(studentId, NaN)) {
                        nav(`${courseId}/enroll`, { state: { email: await Database.getCurrUserEmail(), isEnrolled: enrollmentStatus } });
                    } else {
                        console.log('student details is present');
                        let applyCourseResponse = await applyCourse(serverFormatApplyCourse(studentId, userId, courseId));
                        toast(applyCourseResponse.message);
                    }
                }
            }
        );
    } catch (err) {
        toast('Try again later');
    }

}