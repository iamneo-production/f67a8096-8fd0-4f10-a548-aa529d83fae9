import { useLocation, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxSelect, { FxSelectOption } from "components/Form/FxSelect";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

import CourseAPI from "server/CourseAPI/CourseAPI";
import Database from "database/Database";
import StudentAPI from "server/StudentAPI/StudentAPI";


export let applyCourse = async (sformat) => {
    console.log(sformat);
    let response = await CourseAPI.applyCourse(sformat);
    console.log(response.message);
    CardContainerNotifier.update();
    return response;
}

export let serverFormatApplyCourse = (stuId, userId, courseId) => {
    return {
        course: {
            courseId: `${courseId}`,
        },
        student: {
            studentId: stuId,
        },
        user: {
            id: userId,
        }
    }
}



export default function AdminAddStudent(props) {

    let navigate = useNavigate();

    let param = useParams();

    let loc = useLocation();

    let inputIdOb = userDetailsFormFormat.student.add.input;


    let onFormSubmit = async (formState) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formState);

        let userId = await Database.getUserId();
        let addStudentPayload = await addStudent(serverFormatAddStudent(formState, userId));
        console.log(addStudentPayload);
        if (addStudentPayload) {
            let response;
            if (addStudentPayload.studentId) {
                response = await applyCourse(serverFormatApplyCourse(addStudentPayload.studentId, userId, param.courseId));
            } else {
                response = await applyCourse(serverFormatApplyCourse(addStudentPayload.id, userId, param.courseId));
            }
            navigate(-1);
            toast(response.message);
        } else {
            toast('Please try again later!');
        }
    }


    let serverFormatAddStudent = (formState, userId) => {
        //console.log(formState[inputIdOb.first_name.id].value);

        return {
            user: {
                id: userId,
            },
            firstName: formState[inputIdOb.first_name.id].value,
            lastName: formState[inputIdOb.last_name.id].value,
            motherName: formState[inputIdOb.mother_name.id].value,
            fatherName: formState[inputIdOb.father_name.id].value,
            mobileNumber: `${formState[inputIdOb.phone_number.id].value}*${formState[inputIdOb.alternate_number.id].value}`,
            studentEmail: formState[inputIdOb.email_id.id].value,
            age: formState[inputIdOb.age.id].value,
            gender: formState[inputIdOb.gender.id].value,
            address: `${formState[inputIdOb.house_no.id].value}*${formState[inputIdOb.street_name.id].value}*${formState[inputIdOb.area_name.id].value}*${formState[inputIdOb.pincode.id].value}`,
            state: formState[inputIdOb.state.id].value,
        }

    }



    let addStudent = async (sformat) => {
        //console.log(sformat);
        let response = await StudentAPI.add(sformat);
        if (!response.isError) {
            response.payload = response.payload.course;
        }

        console.log(response.message);
        console.log(response.payload);

        return response.payload;
    }





    let getStateOptions = () => {
        let states = [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"];
        let options = [];
        for (const state of states) {
            options.push(<FxSelectOption key={`state_name_${state}`} value={state} />);
        }

        return options;
    }

    let getAddressInfromationForm = () => {
        return (
            <Formxvi title='Address Infromation' child>
                <FxInput {...inputIdOb.house_no} />
                <FxInput {...inputIdOb.street_name} />
                <FxInput {...inputIdOb.area_name} />
                <FxInput {...inputIdOb.pincode} />
                <FxSelect {...inputIdOb.state}>
                    <FxSelectOption disabled value='Choose State' />
                    {getStateOptions()}
                </FxSelect>
                <FxInput {...inputIdOb.nationality} />
            </Formxvi>
        );
    }

    let getBasicInfo = () => {

        return (
            <>
                <FxInput {...inputIdOb.first_name} />
                <FxInput {...inputIdOb.last_name} />
                <FxInput {...inputIdOb.mother_name} />
                <FxInput {...inputIdOb.father_name} />
                <FxInput {...inputIdOb.phone_number} />
                <FxInput {...inputIdOb.alternate_number} />
                <FxInput {...inputIdOb.email_id} defValue={loc.state.email} />
                <FxInput {...inputIdOb.age} />
                <FxSelect
                    id={inputIdOb.gender.id}
                    label={inputIdOb.gender.placeholder}
                    errorMsg='Please select gender'
                    required>
                    <FxSelectOption disabled value='Choose Gender' />
                    <FxSelectOption value='Male' />
                    <FxSelectOption value='Female' />
                    <FxSelectOption value='Others' />
                </FxSelect>
            </>
        );

    }




    return (
        <Formxvi
            id='addAcademy'
            title='Enrollment Form'
            onFormSubmit={onFormSubmit}>

            {getBasicInfo().props.children}

            {getAddressInfromationForm()}

        </Formxvi>
    );
}