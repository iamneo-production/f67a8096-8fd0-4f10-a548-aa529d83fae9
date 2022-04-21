import { useLocation, useNavigate, useParams } from "react-router-dom";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";

import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import { toast } from "react-toastify";


export default function AdminUpdateAcademy(props) {

    let navigate = useNavigate();

    let params = useParams();

    let preDetails = useLocation().state;

    let academyFormInput = academyCourseDetailsFormFormat.academy.edit.input;

    let onFormSubmit = (formState) => {
        console.log('AdminUpdateAcademy submitted');
        updateAcademy(serverFormat(formState));
    }
    let serverFormat = (formState) => {
        return {
            "instituteId": params.academyId,
            "instituteName": formState[academyFormInput.academy_name.id].value,
            "imageURL": formState[academyFormInput.academy_image_url.id].value,
            "instituteAddress": formState[academyFormInput.academy_location.id].value,
            "instituteMobile": formState[academyFormInput.academy_contact_number.id].value,
            "instituteEmail": formState[academyFormInput.academy_email.id].value,
            "instituteDesc": formState[academyFormInput.academy_description.id].value,
        };
    }

    let updateAcademy = async (sformat) => {
        console.log(sformat);
        let response = await AcademyAPI.update(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
        toast(response.message);
    }

    return (
        <Formxvi
            title='Update Academy'
            onFormSubmit={onFormSubmit}>
            <FxInput {...academyFormInput.academy_name} defValue={preDetails.instituteName} />
            <FxInput {...academyFormInput.academy_contact_number} defValue={preDetails.instituteMobile} />
            <FxInput {...academyFormInput.academy_image_url} defValue={preDetails.imageURL} />
            <FxInput {...academyFormInput.academy_location} defValue={preDetails.instituteAddress} />
            <FxInput {...academyFormInput.academy_email} defValue={preDetails.instituteEmail} />
            <FxTextarea {...academyFormInput.academy_description} defValue={preDetails.instituteDesc} />
        </Formxvi>
    );
}