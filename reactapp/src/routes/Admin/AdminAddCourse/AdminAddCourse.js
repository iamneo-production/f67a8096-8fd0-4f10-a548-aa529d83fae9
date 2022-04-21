import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import CourseAPI from "server/CourseAPI/CourseAPI";
import { toast } from "react-toastify";




export default function AdminAddCourse(props) {

    let navigate = useNavigate();

    let courseFormInput = academyCourseDetailsFormFormat.course.add.input;

    let params = useParams();

    let getAcademyId = () => { return params.academyId; }

    useEffect(() => {
        console.log('AdminAddCourse rendered');
    });


    let onFormSubmit = (formState) => {
        console.log('AdminAddCourse submitted');
        addCourse(serverFormat(formState));
    }

    let serverFormat = (formState) => {
        return {
            "institute": {
                "instituteId": getAcademyId(),
            },
            "courseName": formState[courseFormInput.course_name.id].value,
            "courseDuration": formState[courseFormInput.course_duration.id].value,
            "courseCost": formState[courseFormInput.course_cost.id].value,
            "courseTimings": formState[courseFormInput.course_timing.id].value,
            "courseDesc": formState[courseFormInput.course_description.id].value,
        };
    }

    let addCourse = async (sformat) => {
        console.log(sformat);
        let response = await CourseAPI.add(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
        toast(response.message);
    }



    return (
        <Formxvi
            id='addCourse'
            title='Add Course'
            onFormSubmit={onFormSubmit}>
            <FxInput {...courseFormInput.course_name} />
            <FxInput {...courseFormInput.course_duration} />
            <FxInput {...courseFormInput.course_cost} />
            <FxInput {...courseFormInput.course_timing} />
            <FxTextarea {...courseFormInput.course_description} />
        </Formxvi>
    );

}

/*id = { courseFormInput.course_contact_number.id }
name = { courseFormInput.course_contact_number.name }
label = { courseFormInput.course_contact_number.placeholder }
regex = '^[0-9]{10}$'
errorMsg = 'Please enter valid phone number'
required*/