import { useLocation, useNavigate } from "react-router-dom";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";

import CourseAPI from "server/CourseAPI/CourseAPI";
import { toast } from "react-toastify";



export default function AdminUpdateCourse(props) {

    let navigate = useNavigate();

    let courseFormInput = academyCourseDetailsFormFormat.course.edit.input;

    let preDetails = useLocation().state;

    let getAcademyId = () => { return preDetails.institute.instituteId; }

    let getCourseId = () => { return preDetails.courseId; }


    //console.log(preDetails);


    let onFormSubmit = (formState) => {
        console.log('AdminUpdateCourse submitted');
        updateAcademy(serverFormat(formState));
    }

    let serverFormat = (formState) => {
        return {
            "institute": {
                "instituteId": getAcademyId(),
            },
            "courseId": getCourseId(),
            "courseName": formState[courseFormInput.course_name.id].value,
            "courseDuration": formState[courseFormInput.course_duration.id].value,
            "courseCost": formState[courseFormInput.course_cost.id].value,
            "courseTimings": formState[courseFormInput.course_timing.id].value,
            "courseDesc": formState[courseFormInput.course_description.id].value,
        };
    }

    let updateAcademy = async (sformat) => {
        console.log(sformat);
        let response = await CourseAPI.update(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
        toast(response.message);
    }


    return (
        <Formxvi
            id='updateCourse'
            title='Edit Course'
            onFormSubmit={onFormSubmit}>
            <FxInput {...courseFormInput.course_name} defValue={preDetails.courseName} />
            <FxInput {...courseFormInput.course_duration} defValue={preDetails.courseDuration} />
            <FxInput {...courseFormInput.course_cost} defValue={preDetails.courseCost} />
            <FxInput {...courseFormInput.course_timing} defValue={preDetails.courseTimings} />
            <FxTextarea {...courseFormInput.course_description} defValue={preDetails.courseDesc} />
        </Formxvi>
    );
}